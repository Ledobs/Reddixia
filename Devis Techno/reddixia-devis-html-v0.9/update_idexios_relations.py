from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

SCRIPT_TAG_RE = re.compile(
    r"(<script\s+type=\"application/json\"\s+id=\"cy-cmp-data\">)(.*?)(</script>)",
    re.DOTALL,
)


def _dedupe_nodes_by_id(nodes: list[dict[str, Any]]) -> list[dict[str, Any]]:
    seen: set[str] = set()
    out: list[dict[str, Any]] = []
    for n in nodes:
        data = n.get("data") or {}
        nid = data.get("id")
        if not isinstance(nid, str):
            out.append(n)
            continue
        if nid in seen:
            continue
        seen.add(nid)
        out.append(n)
    return out


def _edge_ids(edges: list[dict[str, Any]]) -> set[str]:
    ids: set[str] = set()
    for e in edges:
        data = e.get("data") or {}
        eid = data.get("id")
        if isinstance(eid, str):
            ids.add(eid)
    return ids


def _unique_edge_id(edges: list[dict[str, Any]], base: str) -> str:
    used = _edge_ids(edges)
    if base not in used:
        return base
    i = 2
    while f"{base}_{i}" in used:
        i += 1
    return f"{base}_{i}"


def _load_json_from_html(html: str) -> tuple[dict[str, Any], tuple[str, str, str]]:
    m = SCRIPT_TAG_RE.search(html)
    if not m:
        raise ValueError("cy-cmp-data JSON block not found")
    prefix, body, suffix = m.group(1), m.group(2), m.group(3)
    return json.loads(body), (prefix, body, suffix)


def _write_json_to_html(html: str, cy: dict[str, Any]) -> str:
    new_body = json.dumps(cy, ensure_ascii=False, indent=2)
    return SCRIPT_TAG_RE.sub(lambda mm: mm.group(1) + new_body + mm.group(3), html, count=1)


def main() -> int:
    base = Path(__file__).resolve().parent
    idexios_path = base / "CMP-IA-TPG-001-Idexios.html"

    # Build mapping from other CMP pages
    pack_to_agents: dict[str, set[str]] = {}
    for p in sorted(base.glob("CMP-IA-TPG-*.html")):
        if p.name == idexios_path.name:
            continue
        html = p.read_text(encoding="utf-8", errors="replace")
        m = SCRIPT_TAG_RE.search(html)
        if not m:
            continue
        cy = json.loads(m.group(2))
        nodes = cy.get("elements", {}).get("nodes", [])
        pack = next((n["data"]["id"] for n in nodes if n.get("data", {}).get("type") == "pack"), None)
        agent = next(
            (
                n["data"]["id"]
                for n in nodes
                if n.get("data", {}).get("type") == "agent" and n.get("data", {}).get("id") != "IDEXIOS-HUB"
            ),
            None,
        )
        if isinstance(pack, str) and isinstance(agent, str):
            pack_to_agents.setdefault(pack, set()).add(agent)

    # Load Idexios page Cytoscape JSON
    html = idexios_path.read_text(encoding="utf-8", errors="replace")
    cy, _ = _load_json_from_html(html)

    elements = cy.setdefault("elements", {})
    nodes: list[dict[str, Any]] = list(elements.get("nodes") or [])
    edges: list[dict[str, Any]] = list(elements.get("edges") or [])

    nodes = _dedupe_nodes_by_id(nodes)

    # Ensure baseline nodes exist
    existing_node_ids = {n.get("data", {}).get("id") for n in nodes if isinstance(n.get("data", {}).get("id"), str)}

    def ensure_node(node_id: str, label: str, node_type: str) -> None:
        if node_id in existing_node_ids:
            # update label/type if present
            for n in nodes:
                data = n.get("data") or {}
                if data.get("id") == node_id:
                    data["label"] = label
                    data["type"] = node_type
            return
        nodes.append({"data": {"id": node_id, "label": label, "type": node_type}})
        existing_node_ids.add(node_id)

    ensure_node("IDEXIOS-HUB", "IDEXIOS-HUB", "agent")
    ensure_node("Outputs", "Autres", "system")

    # Add domain packs + agent nodes
    for pack in sorted(pack_to_agents):
        ensure_node(pack, pack, "pack")
        for agent in sorted(pack_to_agents[pack]):
            ensure_node(agent, agent, "agent")

    # Remove existing route edges (label=route) to avoid duplicates
    edges = [e for e in edges if (e.get("data") or {}).get("label") != "route"]

    # Add routes HUB -> pack
    for pack in sorted(pack_to_agents):
        edges.append(
            {
                "data": {
                    "id": _unique_edge_id(edges, f"e_route_{pack}"),
                    "source": "IDEXIOS-HUB",
                    "target": pack,
                    "label": "route",
                }
            }
        )

    # Ensure containment edges pack -> agent
    for pack in sorted(pack_to_agents):
        for agent in sorted(pack_to_agents[pack]):
            edges.append(
                {
                    "data": {
                        "id": _unique_edge_id(edges, f"e_cont_{pack}_{agent}"),
                        "source": pack,
                        "target": agent,
                        "label": "contient",
                    }
                }
            )

    # Ensure output edge hub -> outputs
    has_out = any((e.get("data") or {}).get("id") == "e_out" for e in edges)
    if not has_out:
        edges.append({"data": {"id": "e_out", "source": "IDEXIOS-HUB", "target": "Outputs", "label": "réponse"}})
    else:
        for e in edges:
            data = e.get("data") or {}
            if data.get("id") == "e_out":
                data["source"] = "IDEXIOS-HUB"
                data["target"] = "Outputs"
                data["label"] = "réponse"

    elements["nodes"] = nodes
    elements["edges"] = edges

    html2 = _write_json_to_html(html, cy)
    if html2 != html:
        idexios_path.write_text(html2, encoding="utf-8")
        print("Updated Idexios Cytoscape relations.")
    else:
        print("No changes needed.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
