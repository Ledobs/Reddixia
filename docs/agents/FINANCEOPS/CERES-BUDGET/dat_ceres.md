# Sources de données — Ceres

> **Agent** : CERES-BUDGET (IA-TPG-018)
> **Domaine** : FinanceOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

CERES-BUDGET contrôle l’adhérence budgétaire : budget vs prévision, dashboards, alertes, notes de politiques et soutien aux arbitrages.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)
- **Types de contenus** : politiques budgétaires, règles d’arbitrage, gabarits alertes/dashboards.

### Dataverse (TPG)
- **Finances / périodes** : `[À confirmer]` `tpg_financials`, `tpg_financial_snap`, `tpg_period`
- **Budgets / prévisions** : `[À confirmer]` (où stockés ? tables/champs)

## Permissions requises (à confirmer)
- Dataverse: lecture finances + périodes.
- SharePoint: lecture procédures finance.

## Points à clarifier
- Où se trouvent les budgets (dans TPG vs externe) ?
- Seuils d’alerte et règles de gouvernance (documentation).

## Flux de données (brouillon)
1. Charger budget/prévision/réel par période.
2. Calculer écarts et tendances.
3. Déclencher alertes selon seuils.
4. Produire dashboards et notes d’arbitrage.
