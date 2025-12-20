# Gabarit — Devis d’architecture d’agent (structure standard)

> À utiliser pour documenter un agent de la famille Reddixia / Idexios (ex. IA‑TPG‑xxx).  
> Format pensé pour être lisible autant par un humain (revue) que par un générateur (IA/outillage).

```yaml
---
code_agent: "IA-TPG-000"
nom_code: "EXEMPLE-ROLE"
nom_court: "Nom d’agent"
version_spec: "v0.01"
domain_pack: "Transversal | PortfolioOps | GovernanceOps | FinanceOps | DeliveryOps | CommsOps"
statut: "Brouillon | En cours | En essais | Approuvé | En prod | Déprécié"
owner: "Idexia"
derniere_mise_a_jour: "YYYY-MM-DD"
---
```

---

## 1) Résumé exécutif (1 page max)
- **Mission:** …
- **Valeur attendue:** …
- **Utilisateurs cibles:** …
- **Limites / hors‑périmètre:** …

## 2) Contexte & positionnement
- **Problème à résoudre:** …
- **Hypothèses:** …
- **Dépendances (agents / services):** …
- **Références:** (liens docs, ADR, gabarits, etc.)

## 3) Contrat d’interface (inputs / outputs)

### 3.1 Inputs (ce que l’agent consomme)
- **Contexte (ctx) requis:** ex. `portfolioId`, `periodId`, `projectIds`, `templateId`
- **Sources de données:** Dataverse, SharePoint, API internes, etc.
- **Paramètres de filtrage:** dates, statuts, BU, centres de coûts, etc.

### 3.2 Outputs (ce que l’agent produit)
- **Format conversationnel:** résumé + sections + recommandations
- **Sorties structurées (si applicable):**
  - JSON (schema stable)
  - Adaptive Card (cardId, version)
  - Tableau (colonnes attendues)
- **Niveau de détail:** `Synthèse | Standard | Détail`
- **Règles de langue:** `FR` par défaut, bilingue au besoin

## 4) Rubriques Idexios (routage / topics)
- Rubrique(s) principale(s): …
- Rubriques secondaires: …
- Motifs d’aiguillage (intent): …

> Indiquer aussi la stratégie “fallback” quand le contexte est incomplet.

## 5) Données & modèle (Dataverse / SQL / autres)

### 5.1 Entités/tables
| Source | Entité/Table | Champs utilisés | Usage | Notes |
|---|---|---|---|---|
| Dataverse | `tpg_project` | … | sélection projets | … |

### 5.2 Règles de qualité des données
- Valeurs manquantes: …
- Normalisation (formats, unités): …
- Contrôles (cohérence dates, montants): …

### 5.3 KPI / mesures (si applicable)
- Définition KPI: …
- Formule / logique: …
- Périodicité: …
- Source de vérité: …

## 6) Sécurité & conformité
- **Principes:** moindre privilège, audit‑first, séparation des rôles
- **Accès aux données:** rôles Dataverse / groupes M365 / RLS
- **Données sensibles:** …
- **Journalisation:** quoi, où, combien de temps
- **Traçabilité:** lien vers ADR / décision

## 7) Orchestration & outils (actions)
Décrire les actions/outils disponibles pour l’agent.

| Outil/Action | Type | Entrées | Sorties | Gestion d’erreur |
|---|---|---|---|---|
| `GetProjects` | Dataverse | filtres | liste projets | retry + log |

## 8) Comportement conversationnel

### 8.1 Style de réponse
- Ton: professionnel courant
- Structure: `Résumé → Détails → Recommandations → Étapes suivantes`
- Formatage: titres courts, tableaux quand utile, unités explicites

### 8.2 Gestion du contexte
- Comment le `ctx` est créé / mis à jour: …
- Multi‑sélection: …
- Confirmation implicite/explicite: …

### 8.3 Cas d’exception (exemples)
- Contexte absent: …
- Données contradictoires: …
- Période invalide: …
- Permissions insuffisantes: …

## 9) Tests & validation

### 9.1 Scénarios de test (minimum)
| ID | Scénario | Données | Attendu | Statut |
|---|---|---|---|---|
| T-01 | Vue portefeuille sans filtres | … | demande de précisions | … |

### 9.2 Jeux d’essai
- Fichiers / données fictives: …
- Règles d’anonymisation: …

### 9.3 Critères d’acceptation
- Contrat de sortie stable (schema/colonnes)
- Messages d’erreurs utiles
- Temps de réponse (si mesuré)
- Couverture des cas “bordure”

## 10) Déploiement & opérations
- Environnements: `UNIT / ACCEP / PROD`
- Variables / secrets: …
- Monitoring: …
- Procédure de rollback: …

## 11) Évolutions
- Backlog (courte liste): …
- Dépendances futures: …
- Risques de dette technique: …

---

## Annexe A — Exemple de “ctx” (modèle)

```json
{
  "v": "ctx.v1",
  "portfolioId": "P-0001",
  "periodId": "2025-12",
  "projectIds": ["PRJ-101", "PRJ-205"],
  "locale": "fr-CA",
  "detailLevel": "standard"
}
```

## Annexe B — Checklist rapide (à cocher)
- [ ] Code agent + version spec présents
- [ ] Domain Pack déclaré
- [ ] Inputs/outputs définis et testés
- [ ] Règles de sécurité décrites
- [ ] Scénarios de test listés
- [ ] Chemin de déploiement `UNIT/ACCEP/PROD` documenté
