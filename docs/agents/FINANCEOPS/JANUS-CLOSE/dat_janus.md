# Sources de données — Janus

> **Agent** : JANUS-CLOSE (IA-TPG-009)
> **Domaine** : FinanceOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

JANUS-CLOSE accélère la clôture de période : rapprochement des écarts, analyse des causes, préparation du pack de clôture et création de cases d’exception/validation.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)
- **Types de contenus** : procédures de clôture, gabarits pack de clôture, règles de conciliation, preuves.

### Dataverse (TPG)
- **Finances / périodes** : `[À confirmer]` `tpg_financials`, `tpg_financial_snap`, `tpg_period`
- **Dimensions d’imputation** : `[À confirmer]` (département, portefeuille, programme, projet, centres de coûts, etc.)

## Permissions requises (à confirmer)

### Dataverse
- Lecture sur finances + périodes + dimensions.

### SharePoint
- Lecture sur procédures/gabarits finance.

## Points à clarifier
- Définitions des écarts (formules, seuils, RAG) et où elles sont documentées.
- Liste des exceptions et workflow d’approbation (dans Dataverse ou ailleurs).

## Flux de données (brouillon)
1. Sélection période (tpg_period).
2. Charger données financières et historiques.
3. Identifier écarts/causes + proposer actions.
4. Produire pack de clôture (gabarits SharePoint) + cases d’exception si applicable.
