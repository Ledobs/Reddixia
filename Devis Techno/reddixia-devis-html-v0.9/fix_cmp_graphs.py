from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any


SCRIPT_TAG_RE = re.compile(
    r"(<script\s+type=\"application/json\"\s+id=\"cy-cmp-data\">)(.*?)(</script>)",
    re.DOTALL,
)

FLOWCHART_RE = re.compile(
    r"(<div class=\"diagram\"><pre class=\"mermaid\">flowchart\s+LR\n)(.*?)(</pre></div>)",
    re.DOTALL,
)

INTERACTIONS_RE = re.compile(
    r"(<p>Interactions typiques\s*:\s*)(.*?)(</p>)",
    re.DOTALL,
)


@dataclass(frozen=True)
class CmpModel:
    pack_id: str | None
    agent_id: str | None  # the CMP agent (not the hub)
    hub_id: str
    outputs_id: str


def _dedupe_nodes_by_id(nodes: list[dict[str, Any]]) -> list[dict[str, Any]]:
    seen: set[str] = set()
    out: list[dict[str, Any]] = []
    for n in nodes:
        node_id = (n.get("data") or {}).get("id")
        if not isinstance(node_id, str):
            out.append(n)
            continue
        if node_id in seen:
            continue
        seen.add(node_id)
        out.append(n)
    return out


def _extract_model(obj: dict[str, Any]) -> CmpModel:
    nodes = obj["elements"]["nodes"]

    hub_id = "IDEXIOS-HUB"
    outputs_id = "Outputs"

    pack_id: str | None = None
    agent_id: str | None = None

    for node in nodes:
        data = node.get("data") or {}
        if data.get("type") == "pack" and isinstance(data.get("id"), str):
            pack_id = data["id"]
        if data.get("type") == "agent" and isinstance(data.get("id"), str):
            nid = data["id"]
            if nid != hub_id:
                agent_id = nid
        if isinstance(data.get("id"), str) and data["id"] == outputs_id:
            outputs_id = data["id"]

    return CmpModel(pack_id=pack_id, agent_id=agent_id, hub_id=hub_id, outputs_id=outputs_id)


def _find_edge(edges: list[dict[str, Any]], *, edge_id: str | None = None, label: str | None = None) -> dict[str, Any] | None:
    for e in edges:
        data = e.get("data") or {}
        if edge_id is not None and data.get("id") == edge_id:
            return e
        if label is not None and data.get("label") == label:
            return e
    return None


def _edge_ids(edges: list[dict[str, Any]]) -> set[str]:
    ids: set[str] = set()
    for e in edges:
        data = e.get("data") or {}
        if isinstance(data.get("id"), str):
            ids.add(data["id"])
    return ids


def _unique_edge_id(edges: list[dict[str, Any]], base: str) -> str:
    used = _edge_ids(edges)
    if base not in used:
        return base
    i = 2
    while f"{base}_{i}" in used:
        i += 1
    return f"{base}_{i}"


def normalize_cytoscape(obj: dict[str, Any]) -> dict[str, Any]:
    elements = obj.get("elements") or {}
    nodes: list[dict[str, Any]] = list(elements.get("nodes") or [])
    edges: list[dict[str, Any]] = list(elements.get("edges") or [])

    # Fix known bug: some pages duplicate nodes with same id.
    nodes = _dedupe_nodes_by_id(nodes)

    model = _extract_model({"elements": {"nodes": nodes}})

    # Rename Outputs node label to "Autres".
    for n in nodes:
        data = n.get("data") or {}
        if data.get("id") == model.outputs_id:
            data["label"] = "Autres"

    # Route edge: HUB -> PACK (for agent CMP pages)
    route = _find_edge(edges, edge_id="e_hub") or _find_edge(edges, label="route")
    if route is not None:
        data = route.get("data") or {}
        if model.agent_id is not None and model.pack_id is not None:
            data["source"] = model.hub_id
            data["target"] = model.pack_id
            data["label"] = "route"

    # Return edge: AGENT -> HUB
    if model.agent_id is not None:
        already = False
        for e in edges:
            data = e.get("data") or {}
            if (
                data.get("source") == model.agent_id
                and data.get("target") == model.hub_id
                and data.get("label") in {"retour", "réponse", "resultat", "résultat"}
            ):
                already = True
                break
        if not already:
            edges.append(
                {
                    "data": {
                        "id": _unique_edge_id(edges, "e_ret"),
                        "source": model.agent_id,
                        "target": model.hub_id,
                        "label": "retour",
                    }
                }
            )

    # Output edge should originate from HUB (Hub assembles final deliverables)
    out_edge = _find_edge(edges, edge_id="e_out")
    if out_edge is None:
        # fallback: find anything that targets Outputs
        for e in edges:
            data = e.get("data") or {}
            if data.get("target") == model.outputs_id:
                out_edge = e
                break
    if out_edge is not None:
        data = out_edge.get("data") or {}
        data["source"] = model.hub_id
        data["target"] = model.outputs_id
        data["label"] = "réponse"

    obj["elements"]["nodes"] = nodes
    obj["elements"]["edges"] = edges
    return obj


def normalize_mermaid_flowchart(text: str, *, pack: str, agent: str) -> str:
    # We introduce a domain node inside the domain subgraph so it can be used as an intermediate hop.
    # Note: the regex replacement already keeps the leading "flowchart LR" line.
    pack_safe = re.sub(r"[^A-Za-z0-9_]", "_", pack)
    dom_id = f"DOM_{pack_safe}" if pack_safe else "DOM_PACK"
    subgraph_id = f"PACK_{pack_safe}" if pack_safe else "PACK"

    return (
        f"  HUB[IDEXIOS-HUB] --&gt; {dom_id}[{pack}]\n\n"
        f"  subgraph {subgraph_id}[{pack}]\n"
        f"    {dom_id}\n"
        f"    AG[{agent}]\n"
        "  end\n\n"
        "  AG --&gt; DV[(Dataverse)]\n"
        "  AG --&gt; SP[(SharePoint)]\n"
        "  AG --&gt; HUB\n"
        "  HUB --&gt; OUT[Autres]\n"
    )


def normalize_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8", errors="replace")

    # Extract / normalize Cytoscape JSON
    m = SCRIPT_TAG_RE.search(original)
    if not m:
        return False

    prefix, json_text, suffix = m.group(1), m.group(2), m.group(3)
    try:
        cy = json.loads(json_text)
    except json.JSONDecodeError:
        return False

    cy_norm = normalize_cytoscape(cy)
    model = _extract_model({"elements": {"nodes": cy_norm["elements"]["nodes"]}})

    updated = original

    # Replace JSON block (pretty, stable)
    new_json_text = json.dumps(cy_norm, ensure_ascii=False, indent=2)
    updated = SCRIPT_TAG_RE.sub(lambda mm: mm.group(1) + new_json_text + mm.group(3), updated, count=1)

    # Update interactions typiques line for agent pages (optional but improves consistency)
    if model.agent_id is not None and model.pack_id is not None:
        updated = INTERACTIONS_RE.sub(
            lambda mm: mm.group(1) + f"IDEXIOS-HUB → {model.pack_id} → {model.agent_id} → (Dataverse/SharePoint) → retour structuré." + mm.group(3),
            updated,
            count=1,
        )

    # Normalize Mermaid flowchart for agent pages only
    if model.agent_id is not None and model.pack_id is not None:
        def _flowchart_repl(mm: re.Match[str]) -> str:
            body = normalize_mermaid_flowchart(mm.group(2), pack=model.pack_id, agent=model.agent_id)
            return mm.group(1) + body + mm.group(3)

        updated = FLOWCHART_RE.sub(_flowchart_repl, updated, count=1)

    if updated != original:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


def main() -> int:
    here = Path(__file__).resolve().parent
    changed = 0
    scanned = 0
    for path in sorted(here.glob("CMP-IA-TPG-*.html")):
        scanned += 1
        if normalize_file(path):
            changed += 1
    print(f"Scanned {scanned} CMP files; updated {changed}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
