# Gabarit — Diagrammes Cytoscape (conventions graphiques)

Ce document fixe les conventions pour produire des graphes Cohérents (Cytoscape.js) dans l’écosystème Idexios/Reddixia: architecture, flux de données, dépendances d’agents, etc.

---

## 1) Principes

- **Lisibilité avant densité**: un graphe = un message principal.
- **Même sémantique, même style**: un type de nœud/liaison ne change pas d’apparence.
- **IDs stables**: permet de versionner et de faire des diff entre versions.
- **Classes CSS**: éviter de “hardcoder” le style sur chaque nœud.

---

## 2) Types de nœuds (typologie)

| Type | Classe Cytoscape | Description | Exemples |
|---|---|---|---|
| Agent | `node-agent` | Agent IA‑TPG‑xxx | Idexios, HERMES‑PROJ |
| Domain Pack | `node-pack` | Regroupe des agents | PortfolioOps, FinanceOps |
| Source de données | `node-data` | Système qui fournit des données | Dataverse, SharePoint |
| Service / API | `node-service` | Service technique | MCP Server, API interne |
| Artefact | `node-artefact` | Document / modèle | Gabarit, ADR, rapport |
| Frontière | `node-boundary` | Zone / périmètre | “Tenant M365”, “Client” |

> Note: la “Frontière” est souvent un **compound node** (parent) qui contient d’autres nœuds.

---

## 3) Types de liens (sémantique)

| Type | Classe edge | Sens | Exemples |
|---|---|---|---|
| Dépendance | `edge-dep` | A dépend de B | Agent → Service |
| Flux de données | `edge-data` | données transitent | Source → Agent |
| Contrôle | `edge-ctrl` | règle/politique | Gouvernance → Agent |
| Publication | `edge-pub` | dépôt/livrable | Agent → SharePoint |
| Événement | `edge-event` | déclencheur | Timer/Webhook → Agent |

Règle: une flèche = un **verbe**. Mettre le verbe dans `data.label` (court).

---

## 4) Conventions d’identifiants

### 4.1 Node `data.id`
Format recommandé:
- Agent: `agent:IA-TPG-001`
- Pack: `pack:PortfolioOps`
- Data: `data:Dataverse`
- Service: `svc:MCP-Idexios`
- Artefact: `art:template-agent`
- Boundary: `bnd:TenantM365`

### 4.2 Edge `data.id`
`<sourceId>__<relation>__<targetId>`

Ex.:
- `agent:IA-TPG-001__uses__data:Dataverse`

---

## 5) Données minimales par élément

### 5.1 Nodes
Champs attendus:
- `id` (unique, stable)
- `label` (court)
- `kind` (agent/pack/data/service/artefact/boundary)
- `owner` (optionnel)
- `status` (optionnel)
- `url` (optionnel: lien doc)

### 5.2 Edges
Champs attendus:
- `id` (unique)
- `source`
- `target`
- `rel` (uses/depends_on/publishes/controls/reads/writes…)
- `label` (optionnel, court)

---

## 6) Layouts recommandés

- **Architecture (vue globale):** `dagre` (LR), packs → agents → services → données.
- **Flux de données:** `breadthfirst` ou `dagre` (LR) selon complexité.
- **Dépendances internes (dense):** `cose` avec “compound” activé.

Conseil: garder un sens stable (gauche→droite) dans les vues de haut niveau.

---

## 7) Styles (exemple de base)

> À adapter dans votre `cy.style([...])`. Le but est d’illustrer la logique “classes”.

```js
const style = [
  { selector: '.node-agent', style: { 'shape': 'round-rectangle', 'label': 'data(label)' } },
  { selector: '.node-pack', style: { 'shape': 'rectangle', 'label': 'data(label)' } },
  { selector: '.node-data', style: { 'shape': 'ellipse', 'label': 'data(label)' } },
  { selector: '.node-service', style: { 'shape': 'hexagon', 'label': 'data(label)' } },
  { selector: '.node-artefact', style: { 'shape': 'tag', 'label': 'data(label)' } },
  { selector: '.node-boundary', style: { 'shape': 'round-rectangle', 'label': 'data(label)' } },

  { selector: '.edge-dep', style: { 'curve-style': 'bezier', 'target-arrow-shape': 'triangle' } },
  { selector: '.edge-data', style: { 'curve-style': 'bezier', 'target-arrow-shape': 'triangle' } },
  { selector: '.edge-ctrl', style: { 'curve-style': 'bezier', 'target-arrow-shape': 'triangle' } },
  { selector: '.edge-pub', style: { 'curve-style': 'bezier', 'target-arrow-shape': 'triangle' } }
];
```

---

## 8) Structure JSON (Cytoscape elements)

```json
{
  "elements": {
    "nodes": [
      { "data": { "id": "pack:PortfolioOps", "label": "PortfolioOps", "kind": "pack" }, "classes": "node-pack" },
      { "data": { "id": "agent:IA-TPG-003", "label": "ATHENA-PORTF", "kind": "agent", "status": "En essais" }, "classes": "node-agent", "parent": "pack:PortfolioOps" },
      { "data": { "id": "data:Dataverse", "label": "Dataverse (TPG)", "kind": "data" }, "classes": "node-data" }
    ],
    "edges": [
      { "data": { "id": "agent:IA-TPG-003__reads__data:Dataverse", "source": "agent:IA-TPG-003", "target": "data:Dataverse", "rel": "reads", "label": "lit" }, "classes": "edge-data" }
    ]
  }
}
```

---

## 9) Règles de qualité (avant de publier)

- [ ] Chaque nœud a un `id` stable et un `label` lisible.
- [ ] Les edges ont un verbe (`rel`) et, si utile, un `label`.
- [ ] Les classes sont utilisées (éviter styles “inline” partout).
- [ ] Un layout par vue (et documenté dans la vue).
- [ ] Pas de doublons: mêmes éléments = mêmes IDs.
