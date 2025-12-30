# Sources de données — Minerva

> **Agent** : MINERVA-DATA (IA-TPG-014)
> **Domaine** : GovernanceOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

MINERVA-DATA produit des briefs de gouvernance data : conformité, changements de politiques/procédures, priorisation d’actions de qualité et preuves.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Gouvernance/` (d’après `agents-registry.md`)
- **Contenus** : politiques, normes, procédures, preuves, communications de changement.

### Dataverse (TPG)
- **Registres & contrôles** : `[À confirmer]` risques/enjeux/changements/décisions/actions
- **Qualité data** : `[À confirmer]` (statuts, champs obligatoires, valeurs manquantes)

## Permissions requises (à confirmer)
- SharePoint: lecture gouvernance + preuves.
- Dataverse: lecture registres/contrôles.

## Points à clarifier
- Quels indicateurs qualité (completude, conformité) sont attendus ?
- Où se trouve la “liste officielle” des procédures/politiques en vigueur ?

## Flux de données (brouillon)
1. Lire politiques/procédures (SharePoint).
2. Lire registres/contrôles (Dataverse).
3. Produire brief (écarts, changements, priorités, preuves).
4. Proposer plan de remédiation.
