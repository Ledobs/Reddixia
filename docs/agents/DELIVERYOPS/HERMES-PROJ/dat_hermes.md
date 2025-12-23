# Sources de données — Hermes

> **Agent** : Hermes  
> **Environment** : DEMO_Partage  
> **Dernière mise à jour** : 23 décembre 2025  
> **Statut** : Publié

## Vue d'ensemble

Agent Hermes est spécialisé dans la gestion et le suivi des données de projet, incluant les tâches, les affectations de ressources, les exigences et les aspects financiers. Il centralise l'accès aux informations TPG et aux documents de référence via SharePoint.

**Statistiques** :
- **SharePoint** : 1 site
- **Dataverse** : 12 tables TPG
- **Total sources** : 13

---

## 📊 Sources Dataverse

### Tables TPG (12 tables)

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

### Classification par domaine

**Gestion de projet** (4 tables)
- `tpg_project` - Données projet principales
- `tpg_project_snap` - Snapshots historiques projet
- `tpg_projectteam` - Membres de l'équipe
- `tpg_requirement` - Exigences du projet

**Gestion des tâches** (4 tables)
- `tpg_projecttask` - Tâches TPG
- `tpg_projecttask_snap` - Snapshots historiques tâches
- `Task` - Tâches Microsoft Planner
- `tpg_tasklabel` - Étiquettes et catégories

**Gestion des ressources** (2 tables)
- `tpg_assignment` - Attribution des ressources
- `tpg_timesheet` - Saisie du temps

**Données financières** (2 tables)
- `tpg_financials` - Données financières actuelles
- `tpg_financial_snap` - Snapshots historiques financiers

---

## 📁 Sources SharePoint

### Site : Idexios-Prime

**URL** : `https://idexia365.sharepoint.com/sites/Idexios/Prime`  
**Rôle** : Site de référence documentaire pour l'agent Hermes

| Type | Nom | Description | Accès |
|------|-----|-------------|-------|
| Site | Idexios-Prime | Documentation et ressources centralisées | Lecture |

**Contenu typique** :
- Documents de référence projet
- Templates et modèles
- Procédures et guides
- Documentation technique

---

## 🔐 Permissions requises

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

---

## 🔄 Flux de données

