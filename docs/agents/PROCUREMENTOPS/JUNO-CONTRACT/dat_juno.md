# Sources de données — Juno

> **Agent** : JUNO-CONTRACT (IA-TPG-017)
> **Domaine** : ProcurementOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

JUNO-CONTRACT analyse contrats/clauses : extraction de points clés, comparaison, risques, matrices d’écarts et note décisionnelle pour approbation.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Procurement/` (d’après `agents-registry.md`)
- **Contenus** : référentiels de contrats/clauses, politiques d’approbation, gabarits note décisionnelle.

### Référentiels procurement
- **RFP / gabarits** : `[À confirmer]` (SharePoint)
- **Flux d’approvisionnement** : `[À confirmer]` (cycle time, étapes, owners)

### Dataverse (TPG)
- `[À confirmer]` (liens projet→contrat, fournisseurs, engagements) si exposés.

## Permissions requises (à confirmer)
- SharePoint: lecture sur référentiels et politiques.
- Dataverse: lecture si intégration projet/contrat existe.

## Points à clarifier
- Où sont stockés les contrats (SPO/Teams/outil externe) et dans quel format ?
- Existe-t-il une taxonomie des clauses (IDs, catégories, risques) ?

## Flux de données (brouillon)
1. Ingestion contrat(s) + référentiel clauses.
2. Extraction points clés + obligations.
3. Analyse risques/écarts + recommandations.
4. Production note décisionnelle + dossier d’approbation.
