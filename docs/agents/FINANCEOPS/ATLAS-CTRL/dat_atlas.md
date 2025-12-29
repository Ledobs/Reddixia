# Sources de données — Atlas

> **Agent** : ATLAS-CTRL (IA-TPG-005)
> **Domaine** : FinanceOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

ATLAS-CTRL consolide effort/coûts/délais/risques pour vérifier l’intégrité des plans, détecter des anomalies et préparer des rapports d’avancement (profil PCO/contrôleur).

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Pilotage/` (d’après `agents-registry.md`)
- **Types de contenus** : procédures PCO, gabarits de reddition, manuel d’opération, preuves (factures/contrats si déposés).

### Dataverse (TPG)
- **Table candidates (communes)** : `[À confirmer]` `tpg_project`, `tpg_projecttask`, `tpg_assignment`, `tpg_timesheet`
- **Finances (si applicable)** : `[À confirmer]` `tpg_financials`, `tpg_financial_snap`, `tpg_period`
- **Contrôles / registres** : `[À confirmer]` (risques, enjeux, actions, décisions, changements)

## Permissions requises (à confirmer)

### SharePoint
- Lecture Idexios-Prime + accès aux gabarits/procédures Pilotage.

### Dataverse
- Lecture sur projets/tâches/affectations/temps + finances si utilisées.

## Points à clarifier
- Où est la source-of-truth contrats/factures (Dataverse vs SharePoint) ?
- Règles RAG CPI/SPI appliquées et où sont-elles documentées ?
- Périmètre exact des contrôles (PCO vs Finance) : entités disponibles.

## Flux de données (brouillon)
1. Charger référentiel projet (projets, WBS, périodes).
2. Consolider (effort, coûts, échéancier, risques).
3. Détecter anomalies (complétude, cohérence, écarts).
4. Produire rapports + recommandations (sans modifier les données).
