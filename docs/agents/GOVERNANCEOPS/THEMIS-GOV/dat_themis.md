# Sources de données — Themis

> **Agent** : THEMIS-GOV (IA-TPG-004)
> **Domaine** : GovernanceOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

THEMIS-GOV surveille paramètres, configurations et qualité des données pour repérer écarts et non-conformités (audit conformité & qualité).

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Gouvernance/` (d’après `agents-registry.md`)
- **Types de contenus** : politiques, normes, procédures, preuves, documentation de configuration.

### Dataverse (TPG)
- **Registres & contrôles** : `[À confirmer]` (risques, enjeux, changements, décisions, actions)
- **Configuration / metadata** : `[À confirmer]` (tables d’onglets/config, dictionnaires, listes de choix)

## Permissions requises (à confirmer)
- SharePoint: lecture gouvernance + preuves.
- Dataverse: lecture sur entités de contrôles + accès éventuel aux métadonnées/config.

## Points à clarifier
- Quels contrôles automatiques doivent être effectués (règles + seuils) ?
- Où est le référentiel des règles de conformité (SharePoint, ADR, autre) ?

## Flux de données (brouillon)
1. Charger politiques/règles (SharePoint).
2. Scanner données TPG (Dataverse) et mesurer écarts.
3. Générer rapport d’audit + recommandations.
4. Créer/mettre à jour items de remédiation (si autorisé).
