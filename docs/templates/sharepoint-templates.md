# Catalogue des gabarits — Idexios‑Prime (SharePoint)

Ce document décrit **où** ranger les gabarits, **comment** les nommer, et **quels** modèles sont disponibles pour Idexios‑Prime (bibliothèque SharePoint de référence).  
Objectif: que les équipes trouvent vite le bon fichier, avec une structure stable et une traçabilité simple (Git ↔ SharePoint).

---

## 1) Périmètre

- **Source de vérité (auteur / édition):** dépôt Git `Templates` (PR + revue).
- **Point de consommation (diffusion):** SharePoint **Idexios‑Prime** (lecture large, usage opérationnel).
- **Cibles typiques:** livrables projet (portefeuille, reddition, gouvernance), gabarits agents, diagrammes, checklists.

---

## 2) Bibliothèques / dossiers recommandés (Idexios‑Prime)

> Idée: une bibliothèque “Templates” qui regroupe les modèles; le reste des bibliothèques héberge les livrables produits à partir de ces modèles.

### 2.1 Bibliothèque: `Templates`
Structure suggérée:

- `Templates/01-Architecture/`
  - `Agents/`
  - `Diagrammes/`
  - `Cartographie-donnees/`
- `Templates/02-Gouvernance/`
  - `Registres/`
  - `Politiques/`
  - `RACI/`
- `Templates/03-Livrables/`
  - `Comite/`
  - `Rapports/`
  - `MOP/`
- `Templates/04-Data-Reporting/`
  - `PowerBI/`
  - `SQL/`
  - `SSRS/`
- `Templates/99-Archive/` *(lecture restreinte; évite la confusion)*

### 2.2 Bibliothèque: `Livrables`
- Livrables générés (pack comité, rapports, exports, documents signés).
- On évite d’y déposer des “modèles” (sinon duplication et dérive).

---

## 3) Types de contenu & métadonnées (recommandé)

### 3.1 Colonnes de base (Templates)
- **Domaine** (Managed Metadata): `Architecture | Gouvernance | Livrables | Data-Reporting`
- **Sous-domaine**: ex. `Agents | Diagrammes | Registres | PowerBI`
- **Version**: ex. `v0.1`, `v1.0`
- **Statut**: `Brouillon | Validé | Déprécié`
- **Propriétaire (Owner)**: équipe ou rôle (ex. “Architecture Idexia”)
- **Compatibilité**: ex. `Idexios v11`, `TPG PPP & Scheduler`, `Project Server SE`
- **Tags**: `Cytoscape, ArchiMate, BPMN, Dataverse, M365`

### 3.2 Colonne “Lien Git”
- URL vers le fichier source dans le dépôt `Templates` (permet audit + contributions).
- Option: remplir automatiquement via pipeline (si vous avez CI/CD).

---

## 4) Conventions de nommage

### 4.1 Format standard (fichier)
`<domaine>__<objet>__<variant>__v<MAJ.MIN>__<lang>.ext`

Exemples:
- `architecture__gabarit-agent__standard__v1.0__fr.md`
- `diagrammes__cytoscape__conventions__v0.3__fr.md`
- `gouvernance__registre-risques__modele__v2.1__fr.xlsx`

### 4.2 Règles simples
- Pas d’accents dans les noms de fichiers.
- Éviter les espaces (préférer `-`).
- Version obligatoire, même en brouillon.
- “Déprécié” = on garde, mais on n’utilise plus (et on pointe vers le remplaçant).

---

## 5) Catalogue des gabarits (référence Git → SharePoint)

> Les éléments ci‑dessous représentent le noyau “Templates” à publier dans Idexios‑Prime.

### 5.1 Architecture / Agents
| Nom (Git) | Usage | Où le ranger (SP) | Notes |
|---|---|---|---|
| `gabarit-devis-architecture-agent.md` | Devis / fiche standard d’un agent | `Templates/01-Architecture/Agents/` | Base pour IA‑TPG‑xxx |
| `checklist-coherence-architecture.md` | Revue qualité architecture | `Templates/01-Architecture/` | Sert en PR / revue |

### 5.2 Diagrammes / Graphes
| Nom (Git) | Usage | Où le ranger (SP) | Notes |
|---|---|---|---|
| `gabarit-diagrammes-cytoscape.md` | Conventions visuelles Cytoscape | `Templates/01-Architecture/Diagrammes/` | Classes, styles, layout |
| `prompt-generation-graphes.md` | Prompts pour générer JSON Cytoscape | `Templates/01-Architecture/Diagrammes/` | Pour accélérer la modélisation |

### 5.3 SharePoint (catalogue)
| Nom (Git) | Usage | Où le ranger (SP) | Notes |
|---|---|---|---|
| `sharepoint-templates.md` | Catalogue + règles de publication | `Templates/` (racine) | Sert de “mode d’emploi” |

---

## 6) Processus de publication (Git → SharePoint)

1. **Modifier / ajouter** un gabarit dans Git (`Templates/`).
2. **PR + revue** (au moins 1 reviewer).
3. **Tag / release** (optionnel mais utile): `templates-vX.Y`.
4. **Publier** dans SharePoint Idexios‑Prime:
   - déposer le fichier dans le bon dossier,
   - remplir les métadonnées,
   - si possible: automatiser via pipeline (Graph/PowerShell/Actions).
5. **Annonce** (Teams/Canal): “Nouveau modèle” + ce qui change.

---

## 7) Gestion du cycle de vie

- **Revue trimestrielle**: repérer les modèles obsolètes (dépréciation).
- **Historique**: conserver les versions majeures (ex. `v1.x` vs `v2.x`).
- **Traçabilité**: chaque gabarit doit indiquer:
  - date de dernière mise à jour,
  - version,
  - propriétaire,
  - compatibilité.

---

## 8) Bloc “en‑tête” recommandé dans chaque gabarit

À copier en haut de chaque fichier de modèle:

```yaml
---
titre: "<Titre du gabarit>"
version: "v0.1"
statut: "Brouillon | Validé | Déprécié"
auteur: "<équipe ou personne>"
derniere_mise_a_jour: "YYYY-MM-DD"
compatibilite: ["Idexios v11", "TPG Dataverse", "M365"]
tags: ["Architecture", "Agents", "Cytoscape"]
---
```
