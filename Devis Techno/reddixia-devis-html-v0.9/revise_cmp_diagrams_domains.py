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


@dataclass(frozen=True)
class CmpInfo:
    path: Path
    pack_id: str | None
    pack_label: str | None
    agent_id: str | None


def _safe_id(value: str) -> str:
    safe = re.sub(r"[^A-Za-z0-9_]", "_", value.strip())
    safe = re.sub(r"_+", "_", safe).strip("_")
    return safe or "X"


def _load_cytoscape(text: str) -> dict[str, Any] | None:
    m = SCRIPT_TAG_RE.search(text)
    if not m:
        return None
    try:
        return json.loads(m.group(2))
    except json.JSONDecodeError:
        return None


def _write_cytoscape(text: str, cy: dict[str, Any]) -> str:
    new_json = json.dumps(cy, ensure_ascii=False, indent=2)
    return SCRIPT_TAG_RE.sub(lambda mm: mm.group(1) + new_json + mm.group(3), text, count=1)


def _extract_pack_and_agent(cy: dict[str, Any]) -> tuple[str | None, str | None, str | None]:
    nodes = cy.get("elements", {}).get("nodes", [])
    pack_id = None
    pack_label = None
    agent_id = None

    for n in nodes:
        data = (n.get("data") or {})
        if data.get("type") == "pack" and isinstance(data.get("id"), str):
            pack_id = data["id"]
            if isinstance(data.get("label"), str):
                pack_label = data["label"]
        if data.get("type") == "agent" and isinstance(data.get("id"), str):
            nid = data["id"]
            if nid != "IDEXIOS-HUB":
                agent_id = nid

    return pack_id, pack_label, agent_id


def _system_targets_for_agent(cy: dict[str, Any], agent_id: str) -> dict[str, str]:
    """Return map system_id -> system_label for systems that the agent connects to."""
    nodes = cy.get("elements", {}).get("nodes", [])
    edges = cy.get("elements", {}).get("edges", [])

    node_label_by_id: dict[str, str] = {}
    for n in nodes:
        data = n.get("data") or {}
        nid = data.get("id")
        if isinstance(nid, str) and isinstance(data.get("label"), str):
            node_label_by_id[nid] = data["label"]

    system_ids: set[str] = set()
    for e in edges:
        data = e.get("data") or {}
        if data.get("source") == agent_id and isinstance(data.get("target"), str):
            target = data["target"]
            if target in {"Dataverse", "SharePoint"}:
                system_ids.add(target)

    out: dict[str, str] = {}
    for sid in sorted(system_ids):
        out[sid] = node_label_by_id.get(sid, sid)
    return out


def _add_other_agents_to_cytoscape(cy: dict[str, Any], *, pack_id: str, agent_id: str, other_agents: list[str]) -> dict[str, Any]:
    elements = cy.setdefault("elements", {})
    nodes: list[dict[str, Any]] = list(elements.get("nodes") or [])
    edges: list[dict[str, Any]] = list(elements.get("edges") or [])

    existing_node_ids: set[str] = set()
    for n in nodes:
        data = n.get("data") or {}
        nid = data.get("id")
        if isinstance(nid, str):
            existing_node_ids.add(nid)

    existing_edge_ids: set[str] = set()
    for e in edges:
        data = e.get("data") or {}
        eid = data.get("id")
        if isinstance(eid, str):
            existing_edge_ids.add(eid)

    def unique_edge_id(base: str) -> str:
        if base not in existing_edge_ids:
            existing_edge_ids.add(base)
            return base
        i = 2
        while f"{base}_{i}" in existing_edge_ids:
            i += 1
        eid = f"{base}_{i}"
        existing_edge_ids.add(eid)
        return eid

    for a in other_agents:
        if a == agent_id:
            continue
        if a not in existing_node_ids:
            nodes.append({"data": {"id": a, "label": a, "type": "agent"}})
            existing_node_ids.add(a)

        # Add containment edge only (no interactions)
        already = False
        for e in edges:
            data = e.get("data") or {}
            if data.get("source") == pack_id and data.get("target") == a and data.get("label") == "contient":
                already = True
                break
        if not already:
            edges.append(
                {
                    "data": {
                        "id": unique_edge_id(f"e_pack_{_safe_id(a)}"),
                        "source": pack_id,
                        "target": a,
                        "label": "contient",
                    }
                }
            )

    elements["nodes"] = nodes
    elements["edges"] = edges
    return cy


def _render_generic_mermaid(*, pack_label: str, pack_id: str, agent_id: str, other_agents: list[str], systems: dict[str, str]) -> str:
    pack_id_safe = _safe_id(pack_id)

    lines: list[str] = []
    lines.append("  classDef domain fill:#f2f2f2,stroke:#999,stroke-width:1px;")
    lines.append("")
    lines.append('  hub["IDEXIOS-HUB"]')
    lines.append('  out["Autres"]')
    lines.append("")
    lines.append(f'  subgraph pack_{pack_id_safe}["{pack_label}"]')
    lines.append("    direction TB")
    lines.append(f'    agent["{agent_id}"]')

    # list other agents in the domain (no edges)
    for i, other in enumerate([a for a in other_agents if a != agent_id], start=1):
        lines.append(f'    other_{i}["{other}"]')

    lines.append(f'    resp["Réponse structurée {pack_label}"]')
    lines.append("  end")
    lines.append(f"  class pack_{pack_id_safe} domain;")
    lines.append("")
    lines.append("  hub --&gt;|demande| agent")

    # external systems
    if "Dataverse" in systems:
        lines.append('  dv[("Dataverse (tables TPG_*)")]')
        lines.append("  agent --&gt;|consultation| dv")
        lines.append("  dv --&gt;|données| agent")
    if "SharePoint" in systems:
        lines.append('  sp[("SharePoint-Prime")]')
        lines.append("  agent --&gt;|consultation| sp")
        lines.append("  sp --&gt;|connaissances| agent")

    lines.append("  agent --&gt;|résultat structuré| resp")
    lines.append("  resp --&gt;|résultat| hub")
    lines.append("  hub --&gt;|livre| out")

    return "\n".join(lines) + "\n"


def _render_hermes_mermaid(*, other_agents: list[str]) -> str:
    # Keep the richer Hermes diagram but add other agents (no edges) inside the DeliveryOps container.
    lines: list[str] = []
    lines.append("  %% Style")
    lines.append("  classDef domain fill:#f2f2f2,stroke:#999,stroke-width:1px;")
    lines.append("")
    lines.append("  %% Acteurs")
    lines.append('  Human["Humain"] --&gt;|question| Hub["IDEXIOS-HUB"]')
    lines.append("")
    lines.append("  %% Domaine DeliveryOps (conteneur)")
    lines.append('  subgraph DeliveryOps["DeliveryOps"]')
    lines.append("    direction LR")
    lines.append('    Hermes["HERMES-PROJ"]')

    # other agents in DeliveryOps (no edges)
    for i, other in enumerate([a for a in other_agents if a != "HERMES-PROJ"], start=1):
        lines.append(f'    Other_{i}["{other}"]')

    lines.append('    RespDO["Réponse structurée DeliveryOps"]')
    lines.append("  end")
    lines.append("  class DeliveryOps domain;")
    lines.append("")
    lines.append("  %% Sources externes")
    lines.append('  Dataverse[("Dataverse (tables TPG_*)")]')
    lines.append('  SharePoint[("SharePoint-Prime")]')
    lines.append('  MCP["MCP Server"]')
    lines.append("")
    lines.append("  %% Orchestration et échanges")
    lines.append("  Hub --&gt;|demande| Hermes")
    lines.append("  Hermes --&gt;|consultation| Dataverse")
    lines.append("  Hermes --&gt;|consultation| SharePoint")
    lines.append("  Hermes --&gt;|consultation| MCP")
    lines.append("")
    lines.append("  Dataverse --&gt;|données| Hermes")
    lines.append("  SharePoint --&gt;|connaissances| Hermes")
    lines.append("  MCP --&gt;|connaissances| Hermes")
    lines.append("")
    lines.append("  Hermes --&gt;|résultat structuré| RespDO")
    lines.append("  RespDO --&gt;|résultat| Hub")
    lines.append("")
    lines.append("  %% Assemblage côté HUB")
    lines.append('  Hub --&gt;|livre| Text["Résultat textuel"]')
    lines.append('  Hub --&gt;|alimente| Report["Rapports"]')
    lines.append('  Hub --&gt;|génère| Deck["Présentation"]')
    lines.append('  Hub --&gt;|affiche| TeamsCard["Adaptive card (Teams)"]')

    return "\n".join(lines) + "\n"


def _replace_flowchart(text: str, new_body: str) -> str:
    # Keep the opening "flowchart LR\n" from the match.
    return FLOWCHART_RE.sub(lambda mm: mm.group(1) + new_body + mm.group(3), text, count=1)


def main() -> int:
    here = Path(__file__).resolve().parent

    # Collect pack -> agents across CMP pages
    infos: list[CmpInfo] = []
    pack_to_agents: dict[str, list[str]] = {}

    for path in sorted(here.glob("CMP-IA-TPG-*.html")):
        text = path.read_text(encoding="utf-8", errors="replace")
        cy = _load_cytoscape(text)
        if not cy:
            continue
        pack_id, pack_label, agent_id = _extract_pack_and_agent(cy)
        infos.append(CmpInfo(path=path, pack_id=pack_id, pack_label=pack_label, agent_id=agent_id))
        if pack_id and agent_id:
            pack_to_agents.setdefault(pack_id, []).append(agent_id)

    # Deduplicate / stable order
    for k, v in list(pack_to_agents.items()):
        pack_to_agents[k] = sorted(set(v))

    changed = 0
    scanned = 0

    for info in infos:
        scanned += 1

        # Skip Idexios CMP for now (special case)
        if info.path.name == "CMP-IA-TPG-001-Idexios.html":
            continue

        text = info.path.read_text(encoding="utf-8", errors="replace")
        cy = _load_cytoscape(text)
        if not cy or not info.pack_id or not info.pack_label or not info.agent_id:
            continue

        other_agents = pack_to_agents.get(info.pack_id, [])

        # Update Cytoscape: show other agents in domain (containment only)
        cy = _add_other_agents_to_cytoscape(cy, pack_id=info.pack_id, agent_id=info.agent_id, other_agents=other_agents)
        text2 = _write_cytoscape(text, cy)

        # Update Mermaid flowchart
        systems = _system_targets_for_agent(cy, info.agent_id)
        if info.agent_id == "HERMES-PROJ":
            new_body = _render_hermes_mermaid(other_agents=other_agents)
        else:
            new_body = _render_generic_mermaid(
                pack_label=info.pack_label,
                pack_id=info.pack_id,
                agent_id=info.agent_id,
                other_agents=other_agents,
                systems=systems,
            )

        text3 = _replace_flowchart(text2, new_body)

        if text3 != text:
            info.path.write_text(text3, encoding="utf-8")
            changed += 1

    print(f"Scanned {scanned} CMP files; updated {changed} (excluding Idexios CMP).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
