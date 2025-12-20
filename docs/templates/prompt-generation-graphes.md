# Prompts — génération de graphes Cytoscape (JSON)

Ce document donne des prompts prêts à copier pour générer des graphes **Cytoscape.js** cohérents: nœuds, liens, classes, et métadonnées.

---

## 1) Contrat de sortie attendu

Tu dois obtenir un objet JSON conforme à:

```json
{
  "elements": {
    "nodes": [],
    "edges": []
  },
  "meta": {
    "title": "",
    "view": "",
    "layout": { "name": "" },
    "version": "v0.1"
  }
}
```

### Règles
- **Aucun texte hors JSON** (sauf si tu le demandes explicitement).
- IDs stables (voir `gabarit-diagrammes-cytoscape.md`).
- `classes` sur chaque node/edge (`node-agent`, `edge-data`, etc.).
- Les edges doivent inclure `rel` (verbe court).

---

## 2) Prompt “générique” (à réutiliser)

Copier/coller et compléter les crochets.

```text
Tu génères UNIQUEMENT un JSON Cytoscape.js.

Contexte:
- Domaine: [Idexios/Reddixia]
- Vue: [architecture|dataflow|dependencies|security]
- Objectif du graphe: [phrase courte]
- Granularité: [haut niveau|détaillée]
- Contraintes:
  1) Output strictement JSON (pas de markdown).
  2) elements.nodes et elements.edges présents.
  3) Chaque node: data.id, data.label, data.kind, classes.
  4) Chaque edge: data.id, source, target, rel, classes.
  5) IDs stables au format: agent:IA-TPG-xxx, pack:Name, data:Name, svc:Name, art:Name, bnd:Name.
  6) meta.layout.name = [dagre|cose|breadthfirst]. Pour dagre: direction LR.
  7) Limite: max 40 nodes, max 80 edges. Si plus, regrouper via packs/boundaries.

Données à modéliser:
[coller ici la liste structurée des composants, agents, sources, services, artefacts, et relations]

Livrer le JSON final.
```

---

## 3) Prompt “vue architecture globale” (packs → agents → services → données)

```text
Génère un graphe Cytoscape.js (JSON strict) qui montre:
- Domain Packs (compound nodes) contenant les agents.
- Les sources de données (Dataverse, SharePoint) et services (MCP).
- Les liens: reads/writes/uses/publishes/depends_on.
- Layout: dagre LR.
- Ajouter meta.title = "Vue globale", meta.view = "architecture", meta.version = "v0.1".

Inclure les éléments suivants:
Packs: Transversal, PortfolioOps, GovernanceOps, FinanceOps, DeliveryOps, CommsOps
Agents: [liste IA-TPG-xxx + nom_code]
Sources: [Dataverse (TPG), SharePoint (Idexios-Prime), Power BI (si pertinent)]
Services: [Idexios orchestrateur, MCP servers, API internes]

Règles:
- Mettre chaque agent dans le pack correspondant via "parent".
- Un edge rel="uses" de l’agent vers les services; rel="reads"/"writes" vers les sources.
- Pas de doublons d’ID.
- Pas de texte hors JSON.
```

---

## 4) Prompt “vue flux de données” (de l’amont vers l’aval)

```text
Produis un JSON Cytoscape.js qui illustre un flux de données:
Sources → Normalisation → Calcul KPI → Consommation (rapports/agents).

Inclure:
- data:Dataverse, data:SharePoint
- svc:Intermediaire-KPI (service/couche)
- art:Rapport-PowerBI, art:Rapport-SSRS
- agents: [agents consommateurs]

Edges attendus:
- rel="extracts" (source -> service)
- rel="transforms" (service -> service ou artefact)
- rel="publishes" (service/agent -> SharePoint)
- rel="feeds" (service -> rapport)

Layout: dagre LR.
Max 25 nodes.
Output: JSON uniquement.
```

---

## 5) Prompt “vue sécurité” (frontières + contrôles)

```text
Génère un JSON Cytoscape.js montrant des frontières (boundaries) et contrôles:
- bnd:TenantM365 contenant SharePoint, Dataverse
- bnd:ZoneMCP contenant les services MCP
- bnd:Users contenant les acteurs (optionnel)

Ajouter des nœuds de type policy/ctrl si utile:
- art:Policy-RLS, art:Policy-DLP, art:Policy-Retention

Edges:
- rel="controls" (policy -> data/service/agent)
- rel="authenticates" (users -> services)
- rel="authorizes" (policy -> services)

Layout: breadthfirst (ou dagre LR si plus lisible).
Output: JSON strict.
```

---

## 6) Recette “améliorer un graphe existant” (diff friendly)

```text
Tu reçois un JSON Cytoscape.js existant. Ta tâche:
1) Ne pas changer les IDs existants.
2) Ajouter uniquement les éléments manquants.
3) Uniformiser classes et champs data (id,label,kind).
4) Corriger les rel (verbes) si incohérents.
5) Mettre meta.version à [nouvelle version].

Voici le JSON:
[coller JSON ici]

Livrer le JSON final (strict).
```

---

## 7) Validation rapide (avant commit)

- JSON valide (parse OK).
- `elements.nodes`/`elements.edges` présents et non null.
- IDs uniques.
- Chaque edge pointe vers des nodes existants.
- `meta.layout.name` présent.
- Aucun commentaire, aucune explication dans la sortie (sauf demandé).
