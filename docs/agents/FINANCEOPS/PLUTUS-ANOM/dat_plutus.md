# Sources de données — Plutus

> **Agent** : PLUTUS-ANOM (IA-TPG-011)
> **Domaine** : FinanceOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

PLUTUS-ANOM identifie des anomalies de dépenses et signaux faibles : tendances atypiques, priorisation des investigations, ouverture de cases de suivi.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)
- **Types de contenus** : règles d’analyse, politiques, gabarits de dossier d’investigation, preuves.

### Dataverse (TPG)
- **Finances / périodes** : `[À confirmer]` `tpg_financials`, `tpg_financial_snap`, `tpg_period`
- **Dimensions** : `[À confirmer]` (projet, département, catégories, fournisseurs si existants)

## Permissions requises (à confirmer)
- Dataverse: lecture finances + périodes.
- SharePoint: lecture procédures finance + gabarits.

## Points à clarifier
- Quelles métriques “dépense” sont disponibles (capex/opex, engagements, réel) ?
- Où créer/consigner les “cases de suivi” (Dataverse: issue/actionitem/change ?) 

## Flux de données (brouillon)
1. Charger dépenses par période/dimension.
2. Détecter anomalies (outliers, ruptures, dérives).
3. Prioriser investigations + proposer actions.
4. Documenter et ouvrir le suivi.
