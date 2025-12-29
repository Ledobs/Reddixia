# Sources de données — Cassandra

> **Agent** : CASSANDRA-FQA (IA-TPG-012)
> **Domaine** : FinanceOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

CASSANDRA-FQA répond aux questions financières avec traçabilité des sources et règles; escalade vers des analyses approfondies au besoin.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)
- **Types de contenus** : politiques/règles, définitions KPI, gabarits réponses, procédures d’escalade.

### Dataverse (TPG)
- **Finances / périodes** : `[À confirmer]` `tpg_financials`, `tpg_financial_snap`, `tpg_period`
- **Référentiels** : `[À confirmer]` (départements, portfolios, programmes, projets)

## Permissions requises (à confirmer)
- Lecture Dataverse sur finances + référentiels.
- Lecture SharePoint sur procédures finance.

## Points à clarifier
- Glossaire / dictionnaire finance (où est-il ?)
- Règles d’arrondi, seuils, RAG, CPI/SPI (documentation exacte).

## Flux de données (brouillon)
1. Identifier la question et le périmètre (période, projet/portefeuille).
2. Collecter données (Dataverse) + règles (SharePoint).
3. Calculer/répondre avec traçabilité + hypothèses.
4. Escalader si données manquantes ou analyse avancée.
