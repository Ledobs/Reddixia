# DAT — HERMES-PROJ (IA-TPG-002)

> **Agent** : HERMES-PROJ  
> **Code** : IA-TPG-002  
> **Identifiant** : HERMES-PROJ  
> **Domain Pack** : DeliveryOps  
> **Statut** : Draft  
> **Dernière mise à jour** : 2025-12-29 16:56:16 EST

## Rôle
Agent de suivi de livraison : il consolide l’avancement des projets, le plan (tâches/jalons), les dépendances, et produit des statuts de projet avec alertes.

## Mission
Réduire le bruit dans le suivi : produire un statut fiable et actionnable, orienté dépendances, risques et prochaines étapes.

## Déclencheurs typiques
- Cycle de statut hebdo/bimensuel
- Changement majeur au plan (jalon déplacé, charge, dépendance)
- Demande de synthèse pour comité (direction/VMO)

## Données d’entrée
- Plan projet : tâches, jalons, charges (Dataverse TPG / Planner Premium) — à confirmer
- Risques, enjeux, décisions (Dataverse TPG)
- Dépendances et impacts croisés (Dataverse TPG)
- Site SharePoint Idexios‑Prime : https://idexia365.sharepoint.com/sites/Idexios/Prime

## Données de sortie
- Statut projet (texte + indicateurs) prêt à publier
- Liste des alertes (dérives, dépendances bloquantes, jalons à risque)
- Mise à jour / consolidation du plan (si autorisé) — à confirmer

## Sources / Tables (Dataverse TPG)

### Tables TPG (inventaire existant)
| # | Nom d'affichage | Nom technique | Type | Usage |
|---|-----------------|---------------|------|-------|
| 1 | Aperçu de la tâche du projet | `tpg_projecttask_snap` | Snapshot | Historique des tâches |
| 2 | Aperçu du projet | `tpg_project_snap` | Snapshot | Historique des projets |
| 3 | Attribution de tâches | `tpg_assignment` | Transactionnel | Affectation ressources |
| 4 | Exigence | `tpg_requirement` | Maître | Gestion des exigences |
| 5 | Feuille de temps | `tpg_timesheet` | Transactionnel | Saisie du temps |
| 6 | Financial Snapshot | `tpg_financial_snap` | Snapshot | Historique financier |
| 7 | Financier | `tpg_financials` | Transactionnel | Données financières |
| 8 | Membre de l'équipe | `tpg_projectteam` | Relation | Composition des équipes |
| 9 | Projet | `tpg_project` | Maître | Données projet |
| 10 | Tâche (Planner) | `Task` | Standard | Tâches Microsoft |
| 11 | Tâche (TPG) | `tpg_projecttask` | Maître | Tâches de projet TPG |
| 12 | Task Label | `tpg_tasklabel` | Référence | Étiquettes de tâches |

### Tables candidates (à confirmer)
- tpg_task (ou msdyn_task)
- tpg_milestone
- tpg_dependency
- tpg_risk, tpg_issue, tpg_decision

## Règles de validation et contrôles
- Statut = période (date début/fin) + source de plan identifiée
- Dépendances bloquantes mises en évidence (owner + date)
- Quand une info manque : marquer « À confirmer » et remonter un besoin de clarification

## Lignes d’action BPMN candidates
| Ligne d’action | Déclencheur | Entrées | Traitement | Sorties |
|---|---|---|---|---|
| DELIV-01 • Émettre statut projet | Cycle statut | Plan + risques + décisions | Consolider + calculer tendances + rédiger | Statut + alertes |
| DELIV-02 • Suivre dépendances | Nouvelle dépendance / blocage | Dépendance + owners | Qualifier impact + notifier + proposer action | Alerte dépendance |

## Hypothèses et points à confirmer
- Règles de calcul CPI/SPI côté Delivery (si applicable) à confirmer
- Autorisation d’écriture sur le plan (read‑only vs write) à confirmer

## Accès / permissions (à confirmer)

### Dataverse
- `prvReadTPGProject` - Lecture des projets TPG
- `prvReadTPGTask` - Lecture des tâches
- `prvReadTPGFinancials` - Lecture des données financières
- `prvReadTPGAssignment` - Lecture des affectations
- `prvReadTPGTimesheet` - Lecture des feuilles de temps
- `prvReadTPGRequirement` - Lecture des exigences
- `prvReadTask` - Lecture des tâches Planner

### SharePoint
- Site Member (Idexios-Prime) - Lecture

## Flux de données (brouillon)
1. Charger plan + référentiels (projet, tâches, ressources).
2. Consolider risques/enjeux/décisions et dépendances.
3. Calculer tendances et détecter alertes.
4. Produire statut + liste d’actions.

