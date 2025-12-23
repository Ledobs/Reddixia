# Sources de données — Idexios

> **Agent** : Idexios  
> **Environment** : DEMO_Partage  
> **Dernière mise à jour** : 23 décembre 2025  
> **Statut** : Publié

## Vue d'ensemble

Agent orchestrateur Idexios est le hub central de gestion de projet, couvrant l'ensemble du cycle de vie : pipeline, capacité, portfolio, contrôles, tâches et finances. Il offre une vue consolidée et transversale sur 6 rubriques de connaissance.

**Statistiques** :
- **SharePoint** : 1 site
- **Dataverse** : 33 tables TPG distinctes (6 rubriques)
- **Total sources** : 34
- **Total références** : 68 (avec doublons entre rubriques)

---

## 📊 Sources Dataverse

### Tables les plus utilisées

| Table | Nom technique | Fréquence | Rubriques |
|-------|---------------|-----------|-----------|
| Projet | `tpg_project` | 6/6 | Pipeline, Capacity, Portfolio, Controls, Task, Finances |
| Type de projet | `tpg_projecttype` | 5/6 | Capacity, Portfolio, Controls, Task |
| Bénéfice | `tpg_benefit` | 4/6 | Portfolio, Controls, Finances |
| Département | `tpg_department` | 3/6 | Pipeline, Capacity, Portfolio |
| Portefeuille | `tpg_portfolio` | 3/6 | Capacity, Portfolio, Controls |

---

### Rubrique : Pipeline (9 tables)

| # | Nom d'affichage | Nom technique | Type |
|---|-----------------|---------------|------|
| 1 | Critère | `tpg_driver` | Référence |
| 2 | Critère pour la demande de projet | `tpg_projectrequestdriver` | Référence |
| 3 | Critère pour le projet | `tpg_projectdriver` | Référence |
| 4 | Décision | `tpg_Decision` | Maître |
| 5 | Demande de projet | `tpg_ProjectRequests` | Transactionnel |
| 6 | Département | `tpg_department` | Référence |
| 7 | Exigence | `tpg_requirement` | Maître |
| 8 | Financier | `tpg_financials` | Transactionnel |
| 9 | Flux de la demande de projet | `tpg_projectrequestflow` | Workflow |

### Rubrique : Capacity (15 tables)

| # | Nom d'affichage | Nom technique | Type |
|---|-----------------|---------------|------|
| 1 | Attribution de tâches | `tpg_assignment` | Transactionnel |
| 2 | Capacité par mois | `tpg_capacitymwd` | Analytique |
| 3 | Département | `tpg_department` | Référence |
| 4 | Disponibilité | `tpg_availability` | Transactionnel |
| 5 | Feuille de temps | `tpg_timesheet` | Transactionnel |
| 6 | Label | `tpg_label` | Référence |
| 7 | Membre de l'équipe | `tpg_projectteam` | Relation |
| 8 | Période | `tpg_period` | Référence |
| 9 | Plan de ressources | `tpg_resourceplan` | Planification |
| 10 | Portefeuille | `tpg_portfolio` | Maître |
| 11 | Programme | `tpg_program` | Maître |
| 12 | Projet | `tpg_project` | Maître |
| 13 | Ressource | `tpg_resourcepool` | Référence |
| 14 | Task Label | `tpg_tasklabel` | Référence |
| 15 | Type de projet | `tpg_projecttype` | Référence |

### Rubrique : Portfolio (15 tables)

| # | Nom d'affichage | Nom technique | Type |
|---|-----------------|---------------|------|
| 1 | Bénéfice | `tpg_benefit` | Maître |
| 2 | Capacité par mois | `tpg_capacitymwd` | Analytique |
| 3 | Changement | `tpg_change` | Maître |
| 4 | Critère | `tpg_driver` | Référence |
| 5 | Critère pour la demande de projet | `tpg_projectrequestdriver` | Référence |
| 6 | Critère pour le projet | `tpg_projectdriver` | Référence |
| 7 | Département | `tpg_department` | Référence |
| 8 | Exigence | `tpg_requirement` | Maître |
| 9 | Mise à jour de l'état d'avancement | `tpg_statusreport` | Reporting |
| 10 | Onglet de type de projet | `tpg_ProjectTypeTab` | Configuration |
| 11 | Partie prenante | `tpg_stakeholder` | Relation |
| 12 | Portefeuille | `tpg_portfolio` | Maître |
| 13 | Programme | `tpg_program` | Maître |
| 14 | Projet | `tpg_project` | Maître |
| 15 | Type de projet | `tpg_projecttype` | Référence |

### Rubrique : Controls (15 tables)

| # | Nom d'affichage | Nom technique | Type |
|---|-----------------|---------------|------|
| 1 | Action | `tpg_actionitem` | Maître |
| 2 | Bénéfice | `tpg_benefit` | Maître |
| 3 | Capacité par mois | `tpg_capacitymwd` | Analytique |
| 4 | Changement | `tpg_change` | Maître |
| 5 | Décision | `tpg_Decision` | Maître |
| 6 | Enseignement tiré | `tpg_lessonlearned` | Maître |
| 7 | Exigence | `tpg_requirement` | Maître |
| 8 | Objectif | `tpg_objective` | Maître |
| 9 | Partie prenante | `tpg_stakeholder` | Relation |
| 10 | Portefeuille | `tpg_portfolio` | Maître |
| 11 | Problème | `tpg_issue` | Maître |
| 12 | Programme | `tpg_program` | Maître |
| 13 | Projet | `tpg_project` | Maître |
| 14 | Risque | `tpg_risk` | Maître |
| 15 | Type de projet | `tpg_projecttype` | Référence |

### Rubrique : Task (10 tables)

| # | Nom d'affichage | Nom technique | Type |
|---|-----------------|---------------|------|
| 1 | Attribution de tâches | `tpg_assignment` | Transactionnel |
| 2 | Plan de ressources | `tpg_resourceplan` | Planification |
| 3 | Planning de référence des tâches | `tpg_taskbaseline` | Baseline |
| 4 | Projet | `tpg_project` | Maître |
| 5 | Ressource | `tpg_resourcepool` | Référence |
| 6 | Tâche | `tpg_projecttask` | Maître |
| 7 | Task Bucket | `tpg_taskbucket` | Organisation |
| 8 | Task Dependency | `tpg_projecttaskdependency` | Relation |
| 9 | Task Label | `tpg_tasklabel` | Référence |
| 10 | Type de projet | `tpg_projecttype` | Référence |

### Rubrique : Finances (4 tables)

| # | Nom d'affichage | Nom technique | Type |
|---|-----------------|---------------|------|
| 1 | Bénéfice | `tpg_benefit` | Maître |
| 2 | Financier | `tpg_financials` | Transactionnel |
| 3 | Période | `tpg_period` | Référence |
| 4 | Projet | `tpg_project` | Maître |

---

## 📁 Sources SharePoint

### Site : Idexios-Prime

**URL** : `https://idexia365.sharepoint.com/sites/Idexios/Prime`  
**Rôle** : Site central de documentation et ressources pour les agents Idexios

| Type | Nom | Description | Accès |
|------|-----|-------------|-------|
| Site | Idexios-Prime | Hub documentaire et bibliothèque de ressources | Lecture |

**Contenu typique** :
- Documentation de référence
- Templates et standards
- Procédures métier
- Guides utilisateurs

---

## 🔐 Permissions requises

### Dataverse
- `prvReadTPGProject` - Lecture des projets
- `prvReadTPGTask` - Lecture des tâches
- `prvReadTPGPortfolio` - Lecture des portfolios
- `prvReadTPGProgram` - Lecture des programmes
- `prvReadTPGFinancials` - Lecture des finances
- `prvReadTPGAssignment` - Lecture des affectations
- `prvReadTPGResource` - Lecture des ressources
- `prvReadTPGRequirement` - Lecture des exigences
- `prvReadTPGRisk` - Lecture des risques
- `prvReadTPGIssue` - Lecture des problèmes
- `prvReadTPGChange` - Lecture des changements
- `prvReadTPGDecision` - Lecture des décisions
- `prvReadTPGBenefit` - Lecture des bénéfices
- `prvReadTPGStakeholder` - Lecture des parties prenantes

### SharePoint  
- Site Member (Idexios-Prime) - Lecture

---

## 🔄 Flux de données

