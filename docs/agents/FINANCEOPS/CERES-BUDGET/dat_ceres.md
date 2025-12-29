# DAT — CERES-BUDGET (IA-TPG-018)

> **Agent** : CERES-BUDGET  
> **Code** : IA-TPG-018  
> **Identifiant** : CERES-BUDGET  
> **Domain Pack** : FinanceOps  
> **Statut** : Draft  
> **Dernière mise à jour** : 2025-12-29 16:56:16 EST

## Rôle
Agent de planification budgétaire : il prépare les budgets, scénarios et allocations en lien avec le portefeuille et les contraintes de capacité.

## Mission
Accélérer la préparation budgétaire et les scénarios, avec des hypothèses explicites et une justification traçable.

## Déclencheurs typiques
- Cycle budgétaire annuel / révision trimestrielle
- Demande de scénario (augmentation/réduction, priorisation)
- Changement majeur de portefeuille (entrée/sortie de projets)

## Données d’entrée
- Portefeuille : projets, priorités, dépendances (Dataverse TPG)
- Historique coûts / réels (Dataverse TPG) — à confirmer
- Contraintes de capacité (TPG / Power Platform) — à confirmer
- SharePoint Idexios‑Prime : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)

## Données de sortie
- Scénarios budgétaires (baseline + variantes)
- Proposition d’allocation par programme/projet/poste
- Justificatifs : hypothèses + impacts (risques, délais) — à confirmer

## Sources / Tables (Dataverse TPG)
- tpg_budget, tpg_budgetline
- tpg_allocation — à confirmer
- tpg_project, tpg_program
- tpg_capacity — à confirmer

## Règles de validation et contrôles
- Chaque scénario documente hypothèses (taux, volumes, périmètre)
- Allocation = somme cohérente (totaux par niveau)
- Marquer « À confirmer » pour toute donnée manquante ou hypothèse forte

## Lignes d’action BPMN candidates
| Ligne d’action | Déclencheur | Entrées | Traitement | Sorties |
|---|---|---|---|---|
| FIN-10 • Construire scénario budgétaire | Demande de scénario | Portefeuille + contraintes | Varier hypothèses + recalculer allocations | Scénario + impacts |
| FIN-11 • Proposer allocation | Cycle budgétaire | Budgets cibles + projets | Répartir + justifier + vérifier totaux | Allocation + justificatifs |

## Hypothèses et points à confirmer
- Règles de priorisation (VMO/LPM) à confirmer
- Structure officielle de postes budgétaires (capex/opex, centres de coût) à confirmer

## Accès / permissions (à confirmer)
- SharePoint Idexios‑Prime : lecture sur procédures finance
- Dataverse : lecture sur budgets/allocations/capacité si utilisés
