# Sources de données — Athena

> **Agent** : ATHENA-PORTF (IA-TPG-003)
> **Domaine** : PortfolioOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

ATHENA-PORTF analyse les données TPG, met en évidence les projets sensibles, prépare des synthèses de comités et propose des scénarios de priorisation (budget/capacité).

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Portefeuille/` (d’après `agents-registry.md`)
- **Contenus** : procédures portefeuille, gabarits synthèses comité, règles de priorisation, preuves.

### Dataverse (TPG)
- **Portefeuille / programme / projet** : `[À confirmer]` tables et champs disponibles.
- **Capacité** : `[À confirmer]` (capacité mensuelle, disponibilité, allocation).
- **Finances (si requis)** : `[À confirmer]` (budget/prévision/réel).

## Permissions requises (à confirmer)
- Dataverse: lecture portefeuille/projets + capacité/finances si utilisées.
- SharePoint: lecture procédures portefeuille.

## Points à clarifier
- Quels sont les critères officiels de priorisation (pondérations, contraintes) ?
- Source de la capacité (TPG vs autre) et granularité (mois/semaine).

## Flux de données (brouillon)
1. Charger portefeuille/projets (TPG).
2. Charger capacité/budget (si disponible).
3. Évaluer scénarios et impacts.
4. Produire synthèse comité + recommandations.
