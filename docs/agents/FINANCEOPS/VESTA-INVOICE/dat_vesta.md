# Sources de données — Vesta

> **Agent** : VESTA-INVOICE (IA-TPG-010)
> **Domaine** : FinanceOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

VESTA-INVOICE gère les exceptions de facturation : détection incohérences/doublons/écarts, préparation d’un dossier d’approbation avec preuves et recommandations.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)
- **Types de contenus** : politiques de facturation, gabarits dossier d’approbation, preuves (factures, bons de commande, contrats si déposés).

### Dataverse (TPG)
- **Finances / périodes** : `[À confirmer]` `tpg_financials`, `tpg_financial_snap`, `tpg_period`
- **Dimensions d’imputation** : `[À confirmer]` (projet/programme/portefeuille/département + codes comptables)

## Permissions requises (à confirmer)

### Dataverse
- Lecture sur finances + périodes.

### SharePoint
- Lecture sur procédures finance + dépôt des preuves.

## Points à clarifier
- Source-of-truth des factures (Dataverse vs SharePoint vs ERP externe).
- Règles de détection d’anomalies (seuils, matching, exceptions typées).

## Flux de données (brouillon)
1. Importer/consulter factures + contexte projet/période.
2. Détecter doublons/écarts/incohérences.
3. Assembler preuves et recommandation.
4. Produire dossier d’approbation (gabarit).
