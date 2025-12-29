# Sources de données — Poseidon

> **Agent** : POSEIDON-CASH (IA-TPG-016)
> **Domaine** : FinanceOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

POSEIDON-CASH analyse les variances de cashflow et tendances (rolling), propose des pistes d’investigation et actions correctives, et prépare un pack d’analyse.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)
- **Types de contenus** : règles cashflow, gabarits pack d’analyse, politiques de prévision.

### Dataverse (TPG)
- **Finances / périodes** : `[À confirmer]` `tpg_financials`, `tpg_financial_snap`, `tpg_period`
- **Axes d’analyse** : `[À confirmer]` (projet/programme/portefeuille, département, type de coût)

## Permissions requises (à confirmer)
- Dataverse: lecture finances + périodes.
- SharePoint: lecture procédures finance.

## Points à clarifier
- Définitions cashflow (réel vs prévision vs engagement) et disponibilité des champs.
- Horizon “rolling” attendu (M0+M1, trimestriel, annuel).

## Flux de données (brouillon)
1. Sélectionner période/horizon.
2. Charger cashflow (réel/prévision) + historiques.
3. Calculer variances + tendances + drivers.
4. Produire pack d’analyse + recommandations.
