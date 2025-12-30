# DAT — CASSANDRA-FQA (IA-TPG-012)

> **Agent** : CASSANDRA-FQA  
> **Code** : IA-TPG-012 — à confirmer  
> **Identifiant** : CASSANDRA-FQA  
> **Domain Pack** : FinanceOps  
> **Statut** : Draft  
> **Dernière mise à jour** : 2025-12-29 16:56:16 EST

## Rôle
Agent d’assurance qualité des prévisions : il évalue la fiabilité des forecasts (coûts/délais), repère les incohérences et documente un niveau de confiance.

## Mission
Améliorer la confiance dans les prévisions en détectant rapidement les signaux faibles et les écarts anormaux.

## Déclencheurs typiques
- Nouvelle prévision soumise / mise à jour EAC
- Écart prévision vs réel dépasse un seuil
- Audit périodique de qualité (mensuel)

## Données d’entrée
- Prévisions / EAC / ETC (Dataverse TPG) — à confirmer
- Réels (temps/coûts) — à confirmer
- Historique des versions de prévisions — à confirmer
- SharePoint Idexios‑Prime : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)

## Données de sortie
- Score de confiance par projet/programme
- Liste d’anomalies (valeurs manquantes, sauts brusques, outliers)
- Recommandations de correction (données à compléter, hypothèses à revoir)

## Sources / Tables (Dataverse TPG)
- tpg_forecast / tpg_eac — à confirmer
- tpg_actual / tpg_cost / tpg_timesheet — à confirmer
- tpg_project

## Règles de validation et contrôles
- Comparer sur la même période et la même devise
- Tracer la source de chaque écart (ligne de données)
- Ne pas modifier les chiffres : proposer, annoter, prioriser

## Lignes d’action BPMN candidates
| Ligne d’action | Déclencheur | Entrées | Traitement | Sorties |
|---|---|---|---|---|
| FIN-20 • Évaluer qualité forecast | Prévision mise à jour | Forecast + réels | Calcul écarts + score confiance + anomalies | Score + liste anomalies |

## Hypothèses et points à confirmer
- Définition exacte de FQA (Forecast QA ou autre) à confirmer
- Seuils de détection et méthode de scoring à confirmer

## Accès / permissions (à confirmer)
- SharePoint Idexios‑Prime : lecture sur procédures finance
- Dataverse : lecture sur prévisions/réels/historique si disponibles
