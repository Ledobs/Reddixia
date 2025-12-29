# Sources de données — Mercury

> **Agent** : MERCURY-COLLECT (IA-TPG-013)
> **Domaine** : FinanceOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

MERCURY-COLLECT structure et suit les actions de recouvrement/AR (si applicable) : priorisation, planification de relances et production d’un plan d’actions.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)
- **Types de contenus** : procédures AR/recouvrement, scripts de relance, gabarits plan d’action.

### Dataverse (TPG)
- **Finances / périodes** : `[À confirmer]` `tpg_financials`, `tpg_financial_snap`, `tpg_period`
- **AR spécifique** : `[À confirmer]` (si une table AR existe, sinon source externe)

### Autres systèmes
- `[À confirmer]` ERP/AR (si hors Dataverse) + mode d’accès.

## Permissions requises (à confirmer)
- Lecture SharePoint procédures finance.
- Lecture Dataverse finances (et entités AR si existantes).

## Points à clarifier
- Le périmètre AR est-il dans Dataverse ou externe ?
- Où consigner les actions de relance (Dataverse action items vs SharePoint) ?

## Flux de données (brouillon)
1. Charger éléments AR par période.
2. Prioriser relances (âge, montant, risque).
3. Produire plan d’action + calendrier.
4. Suivre l’exécution et produire synthèse.
