# Sources de données — Vulcan

> **Agent** : VULCAN-PROC (IA-TPG-019)
> **Domaine** : ProcurementOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

VULCAN-PROC industrialise procurement & RFP ops : exigences, gabarits, analyse cycle time, préparation dossiers d’approbation.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Procurement/` (d’après `agents-registry.md`)
- **Contenus** : gabarits RFP, checklists, politiques, dossiers d’approbation.

### Référentiels
- Contrats/clauses/politiques d’approbation : `[À confirmer]` (SharePoint).
- Données cycle time / étapes procurement : `[À confirmer]` (où stockées ?)

### Dataverse (TPG)
- `[À confirmer]` (si projets/achats reliés dans TPG).

## Permissions requises (à confirmer)
- SharePoint: lecture procédures procurement + gabarits.
- Dataverse: lecture si entités procurement existent.

## Points à clarifier
- Source-of-truth du cycle time procurement (outil, table, export) ?
- Quels livrables standards (RFP, comparatif offres, dossier approbation) ?

## Flux de données (brouillon)
1. Collecter exigences + contexte projet.
2. Générer dossier RFP (gabarits).
3. Suivre cycle time et points de contrôle.
4. Préparer dossier d’approbation (preuves + synthèse).
