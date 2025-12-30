# Sources de données — Gaia

> **Agent** : GAIA-DATA (IA-TPG-007)
> **Domaine** : GovernanceOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

GAIA-DATA veille à la qualité et cohérence des données de référence TPG. Compare référentiels maîtres entre systèmes.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Gouvernance/` (proche du périmètre, à confirmer)
- **Contenus** : dictionnaire de données, politiques de qualité, procédures de correction.

### Dataverse (TPG)
- **Référentiels** : `[À confirmer]` listes de choix, tables maîtres (départements, types de projet, labels, etc.).

### Référentiels externes
- `[À confirmer]` Finances / RH / Org (système + mode d’accès) si comparaison inter-systèmes.

## Permissions requises (à confirmer)
- Dataverse: lecture tables de référence.
- SharePoint: lecture docs gouvernance data.

## Points à clarifier
- Quel est le périmètre des référentiels maîtres (liste exhaustive) ?
- Quelles règles de synchronisation/comparaison (fréquence, tolérances) ?

## Flux de données (brouillon)
1. Lire dictionnaire de données et règles.
2. Extraire référentiels TPG.
3. Comparer avec référentiels externes.
4. Produire rapport de conformité + actions correctives.
