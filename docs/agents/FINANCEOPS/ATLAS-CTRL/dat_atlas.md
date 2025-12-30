# DAT — ATLAS-CTRL (IA-TPG-015)

> **Agent** : ATLAS-CTRL  
> **Code** : IA-TPG-015  
> **Identifiant** : ATLAS-CTRL  
> **Domain Pack** : FinanceOps  
> **Statut** : Draft  
> **Dernière mise à jour** : 2025-12-29 16:56:16 EST

## Rôle
Agent de contrôle financier : il suit coûts vs budget, analyse les écarts, qualifie les dérives et propose des actions de correction.

## Mission
Offrir une vue de contrôle simple et défendable : où ça dérive, pourquoi, et quoi faire ensuite.

## Déclencheurs typiques
- Chargement de nouveaux réels (dépenses, temps, factures)
- Fin de période (mensuel) : analyse des écarts
- Seuils CPI/SPI franchis (vert/ambre/rouge)

## Données d’entrée
- Budget et lignes budgétaires (Dataverse TPG)
- Réels : temps / coûts / achats (Dataverse TPG ou systèmes connectés) — à confirmer
- Prévisions / EAC / ETC (Dataverse TPG) — à confirmer
- SharePoint Idexios‑Prime : `/Idexios-Prime/Procedures/Pilotage/` (d’après `agents-registry.md`) — à confirmer

## Données de sortie
- Rapport d’écarts (budget vs réel vs prévision)
- Alertes (seuils CPI/SPI, dérives, postes sensibles)
- Recommandations (actions correctives, hypothèses à valider)

## Sources / Tables (Dataverse TPG)
- tpg_budget, tpg_budgetline — à confirmer
- tpg_actual, tpg_cost, tpg_timesheet — à confirmer
- tpg_forecast / tpg_eac — à confirmer
- tpg_project (référence)

## Règles de validation et contrôles
- Écart = source + période + devise cohérente
- Traçabilité : chaque recommandation pointe vers des lignes de données
- Gestion des valeurs manquantes : ne pas extrapoler sans le marquer

## Lignes d’action BPMN candidates
| Ligne d’action | Déclencheur | Entrées | Traitement | Sorties |
|---|---|---|---|---|
| FIN-01 • Analyser écarts | Fin de période | Budget + réels + prévisions | Calcul écarts + classification (vert/ambre/rouge) | Rapport écarts |
| FIN-02 • Émettre alerte dérive | Seuil CPI/SPI franchi | KPIs + lignes coût | Qualifier dérive + causes probables + action | Alerte + recommandation |

## Hypothèses et points à confirmer
- Liste exacte des tables financières TPG (noms) à confirmer
- Règles CPI/SPI par type de projet/programme à confirmer
- Code agent à valider (une version précédente mentionnait IA-TPG-005)

## Accès / permissions (à confirmer)
- SharePoint Idexios‑Prime : lecture sur procédures/gabarits pertinents
- Dataverse : lecture sur budgets/réels/prévisions si utilisés
