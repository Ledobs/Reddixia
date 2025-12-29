# Mapping Dataverse — tables/champs (TPG/PPPS)

## Source
- Schéma : https://dbdiagram.io/d/TPG_PPPandS_DEC2025-69459a734bbde0fd74d8852f
- Source DBML : extrait fourni (ex. démarre par `Table activityparty { ... }`) / schéma dbdiagram ci-dessus
- Extraction technique (trace) : `POST https://api.dbdiagram.io/query/69459a734bbde0fd74d8852f` → champ `content` (DBML)
- Date : 2025-12-29

## Périmètre
- Ce document liste uniquement les tables custom du modèle (préfixe `tpg_`) : 45 tables.
- Les champs sont les noms logiques Dataverse (tels que présents dans le DBML).
- La colonne **Statut** est à maintenir (confirmé / à confirmer) ; par défaut ici : **confirmé** car issu du schéma.

## tpg_actionitem
- Clé primaire : tpg_actionitemid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_actionitemid | uniqueidentifier | pk |  | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_task | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |

## tpg_assignment
- Clé primaire : tpg_assignmentid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_assignmentid | uniqueidentifier | pk |  | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_projecttask | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |
| tpg_sourceref | lookup |  | tpg_assignment.tpg_assignmentid | confirmé |
| tpg_teammember | lookup |  | tpg_projectteam.tpg_projectteamid | confirmé |

## tpg_availability
- Clé primaire : tpg_availabilityid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_availabilityid | uniqueidentifier | pk |  | confirmé |
| tpg_base | lookup |  | tpg_availability.tpg_availabilityid | confirmé |
| tpg_department | lookup |  | tpg_department.tpg_departmentid | confirmé |
| tpg_resource | lookup |  | tpg_resourcepool.tpg_resourcepoolid | confirmé |

## tpg_benefit
- Clé primaire : tpg_benefitid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_benefitid | uniqueidentifier | pk |  | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |

## tpg_bulkimportitem
- Clé primaire : tpg_bulkimportitemid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_bulkimportitemid | uniqueidentifier | pk |  | confirmé |
| tpg_job | lookup |  | tpg_bulkimportjob.tpg_bulkimportjobid | confirmé |

## tpg_bulkimportjob
- Clé primaire : tpg_bulkimportjobid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_bulkimportjobid | uniqueidentifier | pk |  | confirmé |

## tpg_capacitymwd
- Clé primaire : tpg_capacitymwdid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_capacitymwdid | uniqueidentifier | pk |  | confirmé |
| tpg_department | lookup |  | tpg_department.tpg_departmentid | confirmé |
| tpg_resource | lookup |  | tpg_resourcepool.tpg_resourcepoolid | confirmé |

## tpg_change
- Clé primaire : tpg_changeid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_changeid | uniqueidentifier | pk |  | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |

## tpg_config
- Clé primaire : tpg_configid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_configid | uniqueidentifier | pk |  | confirmé |

## tpg_decision
- Clé primaire : tpg_decisionid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_decisionid | uniqueidentifier | pk |  | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |

## tpg_department
- Clé primaire : tpg_departmentid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_departmentid | uniqueidentifier | pk |  | confirmé |

## tpg_driver
- Clé primaire : tpg_driverid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_driverid | uniqueidentifier | pk |  | confirmé |

## tpg_errorlog
- Clé primaire : tpg_errorlogid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_errorlogid | uniqueidentifier | pk |  | confirmé |

## tpg_financials
- Clé primaire : tpg_financialsid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_financialsid | uniqueidentifier | pk |  | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_sourceref | lookup |  | tpg_financials.tpg_financialsid | confirmé |

## tpg_interprojectlink
- Clé primaire : tpg_interprojectlinkid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_interprojectlinkid | uniqueidentifier | pk |  | confirmé |
| tpg_source | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |
| tpg_sourceproject | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_target | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |
| tpg_targetproject | lookup |  | tpg_project.tpg_projectid | confirmé |

## tpg_issue
- Clé primaire : tpg_issueid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_issueid | uniqueidentifier | pk |  | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |

## tpg_label
- Clé primaire : tpg_labelid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_labelid | uniqueidentifier | pk |  | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |

## tpg_lessonlearned
- Clé primaire : tpg_lessonlearnedid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_lessonlearnedid | uniqueidentifier | pk |  | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |

## tpg_license
- Clé primaire : tpg_licenseid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_licenseid | uniqueidentifier | pk |  | confirmé |

## tpg_licenseduser
- Clé primaire : tpg_licenseduserid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_license | lookup |  | tpg_license.tpg_licenseid | confirmé |
| tpg_licenseduserid | uniqueidentifier | pk |  | confirmé |

## tpg_objective
- Clé primaire : tpg_objectiveid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_objectiveid | uniqueidentifier | pk |  | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |

## tpg_period
- Clé primaire : tpg_periodid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_periodid | uniqueidentifier | pk |  | confirmé |

## tpg_portfolio
- Clé primaire : tpg_portfolioid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_portfolioid | uniqueidentifier | pk |  | confirmé |

## tpg_program
- Clé primaire : tpg_programid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_dept | lookup |  | tpg_department.tpg_departmentid | confirmé |
| tpg_programid | uniqueidentifier | pk |  | confirmé |

## tpg_project
- Clé primaire : tpg_projectid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_calendar | lookup |  | tpg_availability.tpg_availabilityid | confirmé |
| tpg_dept | lookup |  | tpg_department.tpg_departmentid | confirmé |
| tpg_enterpriseprojecttype | lookup |  | tpg_projecttype.tpg_projecttypeid | confirmé |
| tpg_portfolio | lookup |  | tpg_portfolio.tpg_portfolioid | confirmé |
| tpg_program | lookup |  | tpg_program.tpg_programid | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_projectid | uniqueidentifier | pk |  | confirmé |
| tpg_projectrequest | lookup |  | tpg_projectrequests.tpg_projectrequestsid | confirmé |
| tpg_projecttemplate | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_variantofproject | lookup |  | tpg_project.tpg_projectid | confirmé |

## tpg_projectdriver
- Clé primaire : tpg_projectdriverid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_driver | lookup |  | tpg_driver.tpg_driverid | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_projectdriverid | uniqueidentifier | pk |  | confirmé |

## tpg_projectpermission
- Clé primaire : tpg_projectpermissionid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_projectpermissionid | uniqueidentifier | pk |  | confirmé |
| tpg_sourceref | lookup |  | tpg_projectpermission.tpg_projectpermissionid | confirmé |
| tpgch_project | lookup |  | tpg_project.tpg_projectid | confirmé |

## tpg_projectrequestdriver
- Clé primaire : tpg_projectrequestdriverid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_driver | lookup |  | tpg_driver.tpg_driverid | confirmé |
| tpg_projectrequest | lookup |  | tpg_projectrequests.tpg_projectrequestsid | confirmé |
| tpg_projectrequestdriverid | uniqueidentifier | pk |  | confirmé |

## tpg_projectrequestflow
- Clé primaire : businessprocessflowinstanceid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bpf_tpg_projectrequestsid | lookup |  | tpg_projectrequests.tpg_projectrequestsid | confirmé |
| businessprocessflowinstanceid | uniqueidentifier | pk |  | confirmé |

## tpg_projectrequests
- Clé primaire : tpg_projectrequestsid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_enterpriseprojecttype | lookup |  | tpg_projecttype.tpg_projecttypeid | confirmé |
| tpg_projectrequestsid | uniqueidentifier | pk |  | confirmé |

## tpg_projecttask
- Clé primaire : tpg_projecttaskid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_bucket | lookup |  | tpg_taskbucket.tpg_taskbucketid | confirmé |
| tpg_calendar | lookup |  | tpg_availability.tpg_availabilityid | confirmé |
| tpg_parenttask | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_projecttaskid | uniqueidentifier | pk |  | confirmé |
| tpg_sourceref | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |

## tpg_projecttaskdependency
- Clé primaire : tpg_projecttaskdependencyid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_predecessortask | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_projecttaskdependencyid | uniqueidentifier | pk |  | confirmé |
| tpg_sourceref | lookup |  | tpg_projecttaskdependency.tpg_projecttaskdependencyid | confirmé |
| tpg_successortask | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |

## tpg_projectteam
- Clé primaire : tpg_projectteamid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_projectteamid | uniqueidentifier | pk |  | confirmé |
| tpg_resource | lookup |  | tpg_resourcepool.tpg_resourcepoolid | confirmé |
| tpg_sourceref | lookup |  | tpg_projectteam.tpg_projectteamid | confirmé |

## tpg_projecttype
- Clé primaire : tpg_projecttypeid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_department | lookup |  | tpg_department.tpg_departmentid | confirmé |
| tpg_projecttemplate | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_projecttypeid | uniqueidentifier | pk |  | confirmé |

## tpg_projecttypetab
- Clé primaire : tpg_projecttypetabid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_projecttype | lookup |  | tpg_projecttype.tpg_projecttypeid | confirmé |
| tpg_projecttypetabid | uniqueidentifier | pk |  | confirmé |

## tpg_requirement
- Clé primaire : tpg_requirementid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_requirementid | uniqueidentifier | pk |  | confirmé |

## tpg_resourceplan
- Clé primaire : tpg_resourceplanid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_assignment | lookup |  | tpg_assignment.tpg_assignmentid | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_resourcedepartment | lookup |  | tpg_department.tpg_departmentid | confirmé |
| tpg_resourcename | lookup |  | tpg_resourcepool.tpg_resourcepoolid | confirmé |
| tpg_resourcenameteammember | lookup |  | tpg_projectteam.tpg_projectteamid | confirmé |
| tpg_resourceplanid | uniqueidentifier | pk |  | confirmé |
| tpg_sourceref | lookup |  | tpg_resourceplan.tpg_resourceplanid | confirmé |
| tpg_task | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |

## tpg_resourcepool
- Clé primaire : tpg_resourcepoolid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_basecalendar | lookup |  | tpg_availability.tpg_availabilityid | confirmé |
| tpg_dept | lookup |  | tpg_department.tpg_departmentid | confirmé |
| tpg_resourcepoolid | uniqueidentifier | pk |  | confirmé |

## tpg_risk
- Clé primaire : tpg_riskid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_riskid | uniqueidentifier | pk |  | confirmé |

## tpg_stakeholder
- Clé primaire : tpg_stakeholderid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_stakeholderid | uniqueidentifier | pk |  | confirmé |

## tpg_statusreport
- Clé primaire : tpg_statusreportid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_statusreportid | uniqueidentifier | pk |  | confirmé |

## tpg_taskbaseline
- Clé primaire : tpg_taskbaselineid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_sourceref | lookup |  | tpg_taskbaseline.tpg_taskbaselineid | confirmé |
| tpg_task | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |
| tpg_taskbaselineid | uniqueidentifier | pk |  | confirmé |

## tpg_taskbucket
- Clé primaire : tpg_taskbucketid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_taskbucketid | uniqueidentifier | pk |  | confirmé |

## tpg_tasklabel
- Clé primaire : tpg_tasklabelid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_label | lookup |  | tpg_label.tpg_labelid | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_task | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |
| tpg_tasklabelid | uniqueidentifier | pk |  | confirmé |

## tpg_timesheet
- Clé primaire : tpg_timesheetid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| tpg_assignment | lookup |  | tpg_assignment.tpg_assignmentid | confirmé |
| tpg_period | lookup |  | tpg_period.tpg_periodid | confirmé |
| tpg_planres | lookup |  | tpg_resourceplan.tpg_resourceplanid | confirmé |
| tpg_project | lookup |  | tpg_project.tpg_projectid | confirmé |
| tpg_task | lookup |  | tpg_projecttask.tpg_projecttaskid | confirmé |
| tpg_timesheetid | uniqueidentifier | pk |  | confirmé |


