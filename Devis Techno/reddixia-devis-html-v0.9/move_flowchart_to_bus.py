import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent

EXCLUDE = {
    "CMP-IA-TPG-001-Idexios.html",
    "CMP-IA-TPG-002-Hermes.html",
    "CMP-IA-TPG-008-Apollo.html",
}

BUS_INSERT_BLOCK = (
    "\n<h3>Orchestration (vue « domaine »)</h3>\n"
    "<p>L’agent collecte et analyse des données pour produire une réponse structurée du domaine, renvoyée à IDEXIOS-HUB.</p>\n"
)

NOTICE = "\n<p class=\"small\">Schéma d’orchestration : voir le bloc BUS (vue « domaine »).</p>\n"


def move_flowchart(html: str) -> tuple[str, bool]:
    # Find the flowchart block inside APP (standard pack output)
    flow_re = re.compile(
        r"\n<div style=\"height:10px\"></div>\s*\n"
        r"(?P<flow><div class=\"diagram\"><pre class=\"mermaid\">flowchart LR[\s\S]*?</pre></div>)\n",
        re.MULTILINE,
    )
    match = flow_re.search(html)
    if not match:
        return html, False

    flow_block = match.group("flow")

    # Prepare BUS version: add auto-fit attribute to the diagram wrapper
    flow_block_bus = flow_block.replace('<div class="diagram">', '<div class="diagram" data-mmd-autofit="1">', 1)

    # Remove flowchart from APP
    html_wo_flow = flow_re.sub("\n", html, count=1)

    # Add notice in APP if not already present
    if "Schéma d’orchestration : voir le bloc BUS" not in html_wo_flow:
        # Insert right after the sequenceDiagram block if present
        seq_end_re = re.compile(r"(<div class=\"diagram\"><pre class=\"mermaid\">sequenceDiagram[\s\S]*?</pre></div>)", re.MULTILINE)
        seq_match = seq_end_re.search(html_wo_flow)
        if seq_match:
            insert_at = seq_match.end(1)
            html_wo_flow = html_wo_flow[:insert_at] + NOTICE + html_wo_flow[insert_at:]
        else:
            # fallback: append at end of APP card
            html_wo_flow = html_wo_flow.replace("</div>\n<div class=\"card\">\n  <h2>TECH</h2>", NOTICE + "</div>\n<div class=\"card\">\n  <h2>TECH</h2>")

    # Insert flowchart into BUS card (before its closing </div>)
    bus_card_re = re.compile(
        r"(?P<bus><div class=\"two card\">\s*\n\s*<h2>BUS</h2>[\s\S]*?\n</div>)\n\s*<div class=\"two card\">\s*\n\s*<h2>APP</h2>",
        re.MULTILINE,
    )
    bus_match = bus_card_re.search(html_wo_flow)
    if not bus_match:
        return html, False

    bus_block = bus_match.group("bus")
    if "Orchestration (vue « domaine »)" in bus_block:
        # already has orchestration in BUS; don't duplicate
        return html_wo_flow, True

    # Place just before closing </div> of BUS card
    bus_block_new = bus_block[:-6] + BUS_INSERT_BLOCK + flow_block_bus + "\n\n</div>"

    html_new = html_wo_flow[: bus_match.start("bus")] + bus_block_new + html_wo_flow[bus_match.end("bus") :]
    return html_new, True


def main() -> int:
    changed = 0
    skipped = 0

    for path in sorted(ROOT.glob("CMP-IA-TPG-*.html")):
        if path.name in EXCLUDE:
            continue

        original = path.read_text(encoding="utf-8")
        updated, did_change = move_flowchart(original)

        if did_change and updated != original:
            path.write_text(updated, encoding="utf-8")
            changed += 1
        else:
            skipped += 1

    print(f"Done. Changed: {changed}, skipped: {skipped}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
