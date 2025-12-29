# DAT — PLUTUS-ANOM (IA-TPG-011)

> **Agent** : PLUTUS-ANOM  
> **Code** : IA-TPG-011 — à confirmer  
> **Identifiant** : PLUTUS-ANOM  
> **Domain Pack** : FinanceOps  
> **Statut** : Draft  
> **Dernière mise à jour** : 2025-12-29 16:56:16 EST

## Rôle
Agent de détection d’anomalies financières : il repère des patterns atypiques (dépenses, allocations, temps) et propose une priorisation des vérifications.

## Mission
Réduire le risque d’erreurs de données ou de dérives non vues, sans générer d’alertes inutiles.

## Déclencheurs typiques
- Chargement de nouveaux réels
- Pic soudain sur un poste budgétaire
- Audit ponctuel demandé par contrôle

## Données d’entrée
- Réels et historiques (Dataverse TPG) — à confirmer
- Budget / lignes budgétaires — à confirmer
- Règles métier (seuils, exclusions) — à confirmer
- SharePoint Idexios‑Prime : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)

## Données de sortie
- Liste d’anomalies classées (priorité/impact)
- Justification (comparatif historique, outlier, règle déclenchée)
- Recommandations : vérifier, corriger, documenter

## Sources / Tables (Dataverse TPG)
- tpg_actual / tpg_cost / tpg_timesheet — à confirmer
- tpg_budgetline — à confirmer
- tpg_project

## Règles de validation et contrôles
- Explicabilité : chaque alerte doit dire « pourquoi »
- Seuils configurables (éviter l’alarme permanente)
- Marquer les faux positifs et apprendre (si mécanisme prévu) — à confirmer

## Lignes d’action BPMN candidates
| Ligne d’action | Déclencheur | Entrées | Traitement | Sorties |
|---|---|---|---|---|
| FIN-40 • Détecter anomalies | Nouveaux réels / audit | Réels + historique | Règles + stats simples + priorisation | Liste anomalies + raisons |

## Hypothèses et points à confirmer
- Jeu de règles initial (seuils par poste) à confirmer
- Boucle d’apprentissage (feedback) à confirmer

## Accès / permissions (à confirmer)
- SharePoint : lecture sur procédures finance
- Dataverse : lecture sur réels/budgets si disponibles
