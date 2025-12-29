# Mapping Dataverse — tables/champs (TPG/PPPS)

## Source
- Schéma : https://dbdiagram.io/d/TPG_PPPandS_DEC2025-69459a734bbde0fd74d8852f
- Source DBML : extrait fourni / schéma dbdiagram ci-dessus
- Extraction technique (trace) : `POST https://api.dbdiagram.io/query/69459a734bbde0fd74d8852f` → champ `content` (DBML)
- Date : 2025-12-29

## Périmètre
- Ce document liste toutes les tables présentes dans le DBML : 155 tables (dont 45 custom `tpg_*`).
- Les champs sont les noms logiques Dataverse (tels que présents dans le DBML).
- La colonne **Statut** est à maintenir (confirmé / à confirmer) ; par défaut ici : **confirmé** car issu du schéma.

## aaduser
- Clé primaire : aaduserid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aaduserid | uniqueidentifier | pk |  | confirmé |

## account
- Clé primaire : accountid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| accountid | uniqueidentifier | pk |  | confirmé |
| masterid | lookup |  | account.accountid | confirmé |
| msa_managingpartnerid | lookup |  | account.accountid | confirmé |
| parentaccountid | lookup |  | account.accountid | confirmé |

## accountleads
- Clé primaire : accountleadid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| accountleadid | uniqueidentifier | pk |  | confirmé |

## aciviewmapper
- Clé primaire : aciviewmapperid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aciviewmapperid | uniqueidentifier | pk |  | confirmé |

## actioncard
- Clé primaire : actioncardid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| actioncardid | uniqueidentifier | pk |  | confirmé |
| regardingobjectid | lookup |  | account.accountid ; adx_inviteredemption.activityid ; adx_portalcomment.activityid ; appointment.activityid | confirmé |

## actioncardusersettings
- Clé primaire : actioncardusersettingsid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| actioncardusersettingsid | uniqueidentifier | pk |  | confirmé |

## actioncarduserstate
- Clé primaire : actioncarduserstateid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| actioncardid | lookup |  | actioncard.actioncardid | confirmé |
| actioncarduserstateid | uniqueidentifier | pk |  | confirmé |
| owningbusinessunit | lookup |  | actioncard.actioncardid | confirmé |

## activityfileattachment
- Clé primaire : activityfileattachmentid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| activityfileattachmentid | uniqueidentifier | pk |  | confirmé |

## activitymimeattachment
- Clé primaire : activitymimeattachmentid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| activityid | lookup |  | activitypointer.activityid | confirmé |
| activitymimeattachmentid | uniqueidentifier | pk |  | confirmé |
| attachmentid | lookup |  | attachment.attachmentid | confirmé |
| objectid | lookup |  | activitypointer.activityid | confirmé |

## activitymonitor
- Clé primaire : activitymonitorid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| activitymonitorid | uniqueidentifier | pk |  | confirmé |

## activityparty
- Clé primaire : activitypartyid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| activityid | lookup |  | activitypointer.activityid | confirmé |
| activitypartyid | uniqueidentifier | pk |  | confirmé |
| partyid | lookup |  | account.accountid | confirmé |

## activitypointer
- Clé primaire : activityid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| activityid | uniqueidentifier | pk |  | confirmé |
| regardingobjectid | lookup |  | account.accountid ; adx_invitation.adx_invitationid ; bookableresourcebooking.bookableresourcebookingid ; bookableresourcebookingheader.bookableresourcebookingheaderid | confirmé |

## adminsettingsentity
- Clé primaire : adminsettingsentityid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| adminsettingsentityid | uniqueidentifier | pk |  | confirmé |

## advancedsimilarityrule
- Clé primaire : advancedsimilarityruleid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| advancedsimilarityruleid | uniqueidentifier | pk |  | confirmé |
| azureserviceconnectionid | lookup |  | azureserviceconnection.azureserviceconnectionid | confirmé |

## adx_externalidentity
- Clé primaire : adx_externalidentityid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| adx_externalidentityid | uniqueidentifier | pk |  | confirmé |

## adx_invitation
- Clé primaire : adx_invitationid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| adx_assigntoaccount | lookup |  | account.accountid | confirmé |
| adx_invitationid | uniqueidentifier | pk |  | confirmé |

## adx_invitation_invitecontacts
- Clé primaire : adx_invitation_invitecontactsid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| adx_invitation_invitecontactsid | uniqueidentifier | pk |  | confirmé |

## adx_invitation_mspp_webrole_powerpagecomponent
- Clé primaire : adx_invitation_mspp_webrole_powerpagecomponentid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| adx_invitation_mspp_webrole_powerpagecomponentid | uniqueidentifier | pk |  | confirmé |

## adx_invitation_redeemedcontacts
- Clé primaire : adx_invitation_redeemedcontactsid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| adx_invitation_redeemedcontactsid | uniqueidentifier | pk |  | confirmé |

## adx_inviteredemption
- Clé primaire : activityid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| activityid | uniqueidentifier | pk |  | confirmé |
| regardingobjectid | lookup |  | account.accountid ; adx_invitation.adx_invitationid ; bookableresourcebooking.bookableresourcebookingid ; bookableresourcebookingheader.bookableresourcebookingheaderid | confirmé |

## adx_kbarticle_kbarticle
- Clé primaire : adx_kbarticle_kbarticleid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| adx_kbarticle_kbarticleid | uniqueidentifier | pk |  | confirmé |

## adx_portalcomment
- Clé primaire : activityid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| activityid | uniqueidentifier | pk |  | confirmé |
| regardingobjectid | lookup |  | account.accountid ; adx_invitation.adx_invitationid ; bookableresourcebooking.bookableresourcebookingid ; bookableresourcebookingheader.bookableresourcebookingheaderid | confirmé |

## adx_setting
- Clé primaire : adx_settingid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| adx_settingid | uniqueidentifier | pk |  | confirmé |

## adx_webformsession
- Clé primaire : adx_webformsessionid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| adx_webformsessionid | uniqueidentifier | pk |  | confirmé |

## aicopilot
- Clé primaire : aicopilotid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aicopilotid | uniqueidentifier | pk |  | confirmé |

## aicopilot_aiplugin
- Clé primaire : aicopilot_aipluginid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aicopilot_aipluginid | uniqueidentifier | pk |  | confirmé |

## aiinsightcard
- Clé primaire : aiinsightcardid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aiinsightcardid | uniqueidentifier | pk |  | confirmé |
| aiskillid | lookup |  | aiskillconfig.aiskillconfigid | confirmé |

## aiplugin
- Clé primaire : aipluginid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aipluginid | uniqueidentifier | pk |  | confirmé |
| aiplugintitle | lookup |  | aiplugintitle.aiplugintitleid | confirmé |
| pluginauthid | lookup |  | aipluginauth.aipluginauthid | confirmé |

## aipluginauth
- Clé primaire : aipluginauthid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aipluginauthid | uniqueidentifier | pk |  | confirmé |

## aipluginconversationstarter
- Clé primaire : aipluginconversationstarterid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aipluginconversationstarterid | uniqueidentifier | pk |  | confirmé |

## aipluginconversationstartermapping
- Clé primaire : aipluginconversationstartermappingid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aiplugin | lookup |  | aiplugin.aipluginid | confirmé |
| aipluginconversationstarter | lookup |  | aipluginconversationstarter.aipluginconversationstarterid | confirmé |
| aipluginconversationstartermappingid | uniqueidentifier | pk |  | confirmé |

## aipluginexternalschema
- Clé primaire : aipluginexternalschemaid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aipluginexternalschemaid | uniqueidentifier | pk |  | confirmé |

## aipluginexternalschemaproperty
- Clé primaire : aipluginexternalschemapropertyid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aipluginexternalschemapropertyid | uniqueidentifier | pk |  | confirmé |

## aiplugingovernance
- Clé primaire : aiplugingovernanceid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aicopilot | lookup |  | aicopilot.aicopilotid | confirmé |
| aiplugin | lookup |  | aiplugin.aipluginid | confirmé |
| aiplugingovernanceid | uniqueidentifier | pk |  | confirmé |

## aiplugingovernanceext
- Clé primaire : aiplugingovernanceextid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aicopilot | lookup |  | aicopilot.aicopilotid | confirmé |
| aiplugingovernanceextid | uniqueidentifier | pk |  | confirmé |

## aiplugininstance
- Clé primaire : aiplugininstanceid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aiplugin | lookup |  | aiplugin.aipluginid | confirmé |
| aiplugininstanceid | uniqueidentifier | pk |  | confirmé |

## aipluginoperation
- Clé primaire : aipluginoperationid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aiplugin | lookup |  | aiplugin.aipluginid | confirmé |
| aipluginoperationid | uniqueidentifier | pk |  | confirmé |
| aipluginoperationresponsetemplate | lookup |  | aipluginoperationresponsetemplate.aipluginoperationresponsetemplateid | confirmé |

## aipluginoperationparameter
- Clé primaire : aipluginoperationparameterid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aipluginoperation | lookup |  | aipluginoperation.aipluginoperationid | confirmé |
| aipluginoperationparameterid | uniqueidentifier | pk |  | confirmé |

## aipluginoperationresponsetemplate
- Clé primaire : aipluginoperationresponsetemplateid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aipluginoperationresponsetemplateid | uniqueidentifier | pk |  | confirmé |

## aiplugintitle
- Clé primaire : aiplugintitleid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aiplugintitleid | uniqueidentifier | pk |  | confirmé |

## aipluginusersetting
- Clé primaire : aipluginusersettingid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aipluginusersettingid | uniqueidentifier | pk |  | confirmé |

## aiskillconfig
- Clé primaire : aiskillconfigid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aiskillconfigid | uniqueidentifier | pk |  | confirmé |
| attribute | lookup |  | attribute.attributeid | confirmé |

## aitags_msdyncrm_keyword_msdyncrm_file
- Clé primaire : aitags_msdyncrm_keyword_msdyncrm_fileid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| aitags_msdyncrm_keyword_msdyncrm_fileid | uniqueidentifier | pk |  | confirmé |

## allowedmcpclient
- Clé primaire : allowedmcpclientid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| allowedmcpclientid | uniqueidentifier | pk |  | confirmé |

## annotation
- Clé primaire : annotationid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| annotationid | uniqueidentifier | pk |  | confirmé |
| objectid | lookup |  | account.accountid ; adx_invitation.adx_invitationid ; adx_inviteredemption.activityid ; adx_portalcomment.activityid ; appointment.activityid ; approvalprocess.approvalprocessid ; approvalstageapproval.approvalstageapprovalid ; bookableresource.bookableresourceid ; bookableresourcebooking.bookableresourcebookingid ; bookableresourcebookingheader.bookableresourcebookingheaderid ; bookableresourcecategoryassn.bookableresourcecategoryassnid ; bookableresourcecharacteristic.bookableresourcecharacteristicid ; bookableresourcegroup.bookableresourcegroupid | confirmé |

## annualfiscalcalendar
- Clé primaire : userfiscalcalendarid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| userfiscalcalendarid | uniqueidentifier | pk |  | confirmé |

## appaction
- Clé primaire : appactionid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appactionid | uniqueidentifier | pk |  | confirmé |
| appmoduleid | lookup |  | appmodule.appmoduleid | confirmé |
| parentappactionid | lookup |  | appaction.appactionid | confirmé |

## appaction_appactionrule_classicrules
- Clé primaire : appaction_appactionrule_classicrulesid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appaction_appactionrule_classicrulesid | uniqueidentifier | pk |  | confirmé |

## appactionmigration
- Clé primaire : appactionmigrationid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appactionmigrationid | uniqueidentifier | pk |  | confirmé |

## appactionrule
- Clé primaire : appactionruleid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appactionruleid | uniqueidentifier | pk |  | confirmé |

## appactionrule_webresource_scripts
- Clé primaire : appactionrule_webresource_scriptsid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appactionrule_webresource_scriptsid | uniqueidentifier | pk |  | confirmé |

## appconfig
- Clé primaire : appconfigid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appconfigid | uniqueidentifier | pk |  | confirmé |
| appmoduleid | lookup |  | appmodule.appmoduleid | confirmé |

## appconfiginstance
- Clé primaire : appconfiginstanceid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appconfigid | lookup |  | appconfig.appconfigid | confirmé |
| appconfiginstanceid | uniqueidentifier | pk |  | confirmé |
| appconfigmasterid | lookup |  | appconfigmaster.appconfigmasterid | confirmé |

## appconfigmaster
- Clé primaire : appconfigmasterid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appconfigmasterid | uniqueidentifier | pk |  | confirmé |

## appelement
- Clé primaire : appelementid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appelementid | uniqueidentifier | pk |  | confirmé |
| objectid | lookup |  | aiskillconfig.aiskillconfigid ; bot.botid | confirmé |
| parentappmoduleid | lookup |  | appmodule.appmoduleid | confirmé |

## appentitysearchview
- Clé primaire : appentitysearchviewid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appentitysearchviewid | uniqueidentifier | pk |  | confirmé |

## application
- Clé primaire : applicationid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| applicationid | uniqueidentifier | pk |  | confirmé |

## applicationfile
- Clé primaire : fileid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| fileid | uniqueidentifier | pk |  | confirmé |

## applicationroles
- Clé primaire : applicationrolesid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| applicationrolesid | uniqueidentifier | pk |  | confirmé |

## applicationuser
- Clé primaire : applicationuserid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| applicationuserid | uniqueidentifier | pk |  | confirmé |

## applicationuserprofile
- Clé primaire : applicationuserprofileid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| applicationuserprofileid | uniqueidentifier | pk |  | confirmé |

## applicationuserrole
- Clé primaire : applicationuserroleid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| applicationuserroleid | uniqueidentifier | pk |  | confirmé |

## appmodule
- Clé primaire : appmoduleid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appmoduleid | uniqueidentifier | pk |  | confirmé |

## appmodulecomponent
- Clé primaire : appmodulecomponentid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appmodulecomponentid | uniqueidentifier | pk |  | confirmé |
| appmoduleidunique | lookup |  | appmodule.appmoduleid | confirmé |

## appmodulecomponentedge
- Clé primaire : appmodulecomponentedgeid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appmodulecomponentedgeid | uniqueidentifier | pk |  | confirmé |
| componentnodefrom | lookup |  | appmodulecomponentnode.appmodulecomponentnodeid | confirmé |
| componentnodeto | lookup |  | appmodulecomponentnode.appmodulecomponentnodeid | confirmé |

## appmodulecomponentnode
- Clé primaire : appmodulecomponentnodeid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appmodulecomponentnodeid | uniqueidentifier | pk |  | confirmé |

## appmodulemetadata
- Clé primaire : appmodulemetadataid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appmodulemetadataid | uniqueidentifier | pk |  | confirmé |

## appmodulemetadatadependency
- Clé primaire : appmodulemetadatadependencyid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appmodulemetadatadependencyid | uniqueidentifier | pk |  | confirmé |

## appmodulemetadataoperationlog
- Clé primaire : appmodulemetadataoperationlogid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appmodulemetadataoperationlogid | uniqueidentifier | pk |  | confirmé |

## appmoduleroles
- Clé primaire : appmoduleroleid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appmoduleid | lookup |  | appmodule.appmoduleid | confirmé |
| appmoduleroleid | uniqueidentifier | pk |  | confirmé |

## appnotification
- Clé primaire : appnotificationid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appmoduleid | lookup |  | appmodule.appmoduleid | confirmé |
| appnotificationid | uniqueidentifier | pk |  | confirmé |

## appointment
- Clé primaire : activityid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| activityid | uniqueidentifier | pk |  | confirmé |
| regardingobjectid | lookup |  | account.accountid ; adx_invitation.adx_invitationid ; bookableresourcebooking.bookableresourcebookingid ; bookableresourcebookingheader.bookableresourcebookingheaderid | confirmé |

## approvalprocess
- Clé primaire : approvalprocessid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| approvalprocessid | uniqueidentifier | pk |  | confirmé |

## approvalstageapproval
- Clé primaire : approvalstageapprovalid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| approvalstageapprovalid | uniqueidentifier | pk |  | confirmé |

## approvalstagecondition
- Clé primaire : approvalstageconditionid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| approvalstageconditionid | uniqueidentifier | pk |  | confirmé |

## approvalstageintelligent
- Clé primaire : approvalstageintelligentid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| approvalstageintelligentid | uniqueidentifier | pk |  | confirmé |

## approvalstageorder
- Clé primaire : approvalstageorderid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| approvalstageorderid | uniqueidentifier | pk |  | confirmé |
| stageapproval | lookup |  | approvalstageapproval.approvalstageapprovalid | confirmé |
| stagecondition | lookup |  | approvalstagecondition.approvalstageconditionid | confirmé |
| stageintelligent | lookup |  | approvalstageintelligent.approvalstageintelligentid | confirmé |

## appsetting
- Clé primaire : appsettingid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appsettingid | uniqueidentifier | pk |  | confirmé |
| parentappmoduleid | lookup |  | appmodule.appmoduleid | confirmé |

## appusersetting
- Clé primaire : appusersettingid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| appusersettingid | uniqueidentifier | pk |  | confirmé |
| parentappmoduleid | lookup |  | appmodule.appmoduleid | confirmé |

## archivecleanupinfo
- Clé primaire : archivecleanupinfoid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| archivecleanupinfoid | uniqueidentifier | pk |  | confirmé |

## archivecleanupoperation
- Clé primaire : archivecleanupoperationid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| archivecleanupoperationid | uniqueidentifier | pk |  | confirmé |

## asyncoperation
- Clé primaire : asyncoperationid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| asyncoperationid | uniqueidentifier | pk |  | confirmé |
| regardingobjectid | lookup |  | account.accountid ; accountleads.accountleadid ; activityfileattachment.activityfileattachmentid ; activitymimeattachment.activitymimeattachmentid ; activitymonitor.activitymonitorid ; activitypointer.activityid ; adminsettingsentity.adminsettingsentityid ; adx_externalidentity.adx_externalidentityid ; adx_invitation.adx_invitationid ; adx_inviteredemption.activityid ; adx_portalcomment.activityid ; adx_setting.adx_settingid ; adx_webformsession.adx_webformsessionid ; aicopilot.aicopilotid ; aiinsightcard.aiinsightcardid ; aiplugin.aipluginid ; aipluginauth.aipluginauthid ; aipluginconversationstarter.aipluginconversationstarterid ; aipluginconversationstartermapping.aipluginconversationstartermappingid ; aipluginexternalschema.aipluginexternalschemaid ; aipluginexternalschemaproperty.aipluginexternalschemapropertyid ; aiplugingovernance.aiplugingovernanceid ; aiplugingovernanceext.aiplugingovernanceextid ; aiplugininstance.aiplugininstanceid ; aipluginoperation.aipluginoperationid ; aipluginoperationparameter.aipluginoperationparameterid ; aipluginoperationresponsetemplate.aipluginoperationresponsetemplateid ; aiplugintitle.aiplugintitleid ; aipluginusersetting.aipluginusersettingid ; aiskillconfig.aiskillconfigid ; allowedmcpclient.allowedmcpclientid ; annotation.annotationid ; annualfiscalcalendar.userfiscalcalendarid ; appaction.appactionid ; appactionmigration.appactionmigrationid ; appactionrule.appactionruleid ; appelement.appelementid ; appentitysearchview.appentitysearchviewid ; application.applicationid ; applicationuser.applicationuserid ; appmodulecomponentedge.appmodulecomponentedgeid ; appmodulecomponentnode.appmodulecomponentnodeid ; appointment.activityid ; approvalprocess.approvalprocessid ; approvalstageapproval.approvalstageapprovalid ; approvalstagecondition.approvalstageconditionid ; approvalstageintelligent.approvalstageintelligentid ; approvalstageorder.approvalstageorderid ; appsetting.appsettingid ; appusersetting.appusersettingid ; archivecleanupinfo.archivecleanupinfoid ; archivecleanupoperation.archivecleanupoperationid ; attributeclusterconfig.attributeclusterconfigid ; attributeimageconfig.attributeimageconfigid ; attributemap.attributemapid ; attributemaskingrule.attributemaskingruleid ; attributepicklistvalue.attributepicklistvalueid ; bookableresource.bookableresourceid ; bookableresourcebooking.bookableresourcebookingid ; bookableresourcebookingexchangesyncidmapping.bookableresourcebookingexchangesyncidmappingid ; bookableresourcebookingheader.bookableresourcebookingheaderid ; bookableresourcecategory.bookableresourcecategoryid ; bookableresourcecategoryassn.bookableresourcecategoryassnid ; bookableresourcecharacteristic.bookableresourcecharacteristicid ; bookableresourcegroup.bookableresourcegroupid ; bookingstatus.bookingstatusid ; bot.botid ; botcomponent.botcomponentid ; tpg_actionitem.tpg_actionitemid ; tpg_assignment.tpg_assignmentid ; tpg_availability.tpg_availabilityid ; tpg_benefit.tpg_benefitid ; tpg_bulkimportitem.tpg_bulkimportitemid ; tpg_bulkimportjob.tpg_bulkimportjobid ; tpg_capacitymwd.tpg_capacitymwdid ; tpg_change.tpg_changeid ; tpg_config.tpg_configid ; tpg_decision.tpg_decisionid ; tpg_department.tpg_departmentid ; tpg_driver.tpg_driverid ; tpg_errorlog.tpg_errorlogid ; tpg_financials.tpg_financialsid ; tpg_interprojectlink.tpg_interprojectlinkid ; tpg_issue.tpg_issueid ; tpg_label.tpg_labelid ; tpg_lessonlearned.tpg_lessonlearnedid ; tpg_license.tpg_licenseid ; tpg_licenseduser.tpg_licenseduserid ; tpg_objective.tpg_objectiveid ; tpg_period.tpg_periodid ; tpg_portfolio.tpg_portfolioid ; tpg_program.tpg_programid ; tpg_project.tpg_projectid ; tpg_projectdriver.tpg_projectdriverid ; tpg_projectpermission.tpg_projectpermissionid ; tpg_projectrequestdriver.tpg_projectrequestdriverid ; tpg_projectrequestflow.businessprocessflowinstanceid ; tpg_projectrequests.tpg_projectrequestsid ; tpg_projecttask.tpg_projecttaskid ; tpg_projecttaskdependency.tpg_projecttaskdependencyid ; tpg_projectteam.tpg_projectteamid ; tpg_projecttype.tpg_projecttypeid ; tpg_projecttypetab.tpg_projecttypetabid ; tpg_requirement.tpg_requirementid ; tpg_resourceplan.tpg_resourceplanid ; tpg_resourcepool.tpg_resourcepoolid ; tpg_risk.tpg_riskid ; tpg_stakeholder.tpg_stakeholderid ; tpg_statusreport.tpg_statusreportid ; tpg_taskbaseline.tpg_taskbaselineid ; tpg_taskbucket.tpg_taskbucketid ; tpg_tasklabel.tpg_tasklabelid ; tpg_timesheet.tpg_timesheetid | confirmé |

## attachment
- Clé primaire : attachmentid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| attachmentid | uniqueidentifier | pk |  | confirmé |

## attribute
- Clé primaire : attributeid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| attributeid | uniqueidentifier | pk |  | confirmé |

## attributeclusterconfig
- Clé primaire : attributeclusterconfigid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| attributeclusterconfigid | uniqueidentifier | pk |  | confirmé |
| extensionofrecordid | lookup |  | attribute.attributeid | confirmé |

## attributeimageconfig
- Clé primaire : attributeimageconfigid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| attributeimageconfigid | uniqueidentifier | pk |  | confirmé |

## attributemap
- Clé primaire : attributemapid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| attributemapid | uniqueidentifier | pk |  | confirmé |
| parentattributemapid | lookup |  | attributemap.attributemapid | confirmé |

## attributemaskingrule
- Clé primaire : attributemaskingruleid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| attributemaskingruleid | uniqueidentifier | pk |  | confirmé |

## attributepicklistvalue
- Clé primaire : attributepicklistvalueid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| attributepicklistvalueid | uniqueidentifier | pk |  | confirmé |

## audit
- Clé primaire : auditid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| auditid | uniqueidentifier | pk |  | confirmé |

## authorizationserver
- Clé primaire : authorizationserverid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| authorizationserverid | uniqueidentifier | pk |  | confirmé |

## availabletimes
- Clé primaire : availabletimesid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| availabletimesid | uniqueidentifier | pk |  | confirmé |

## availabletimesdatasource
- Clé primaire : availabletimesdatasourceid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| availabletimesdatasourceid | uniqueidentifier | pk |  | confirmé |

## azureserviceconnection
- Clé primaire : azureserviceconnectionid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| azureserviceconnectionid | uniqueidentifier | pk |  | confirmé |

## backgroundoperation
- Clé primaire : backgroundoperationid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| backgroundoperationid | uniqueidentifier | pk |  | confirmé |

## bookableresource
- Clé primaire : bookableresourceid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| accountid | lookup |  | account.accountid | confirmé |
| bookableresourceid | uniqueidentifier | pk |  | confirmé |

## bookableresourcebooking
- Clé primaire : bookableresourcebookingid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bookableresourcebookingid | uniqueidentifier | pk |  | confirmé |
| bookingstatus | lookup |  | bookingstatus.bookingstatusid | confirmé |
| header | lookup |  | bookableresourcebookingheader.bookableresourcebookingheaderid | confirmé |
| resource | lookup |  | bookableresource.bookableresourceid | confirmé |

## bookableresourcebookingexchangesyncidmapping
- Clé primaire : bookableresourcebookingexchangesyncidmappingid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bookableresourcebookingexchangesyncidmappingid | uniqueidentifier | pk |  | confirmé |

## bookableresourcebookingheader
- Clé primaire : bookableresourcebookingheaderid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bookableresourcebookingheaderid | uniqueidentifier | pk |  | confirmé |

## bookableresourcecategory
- Clé primaire : bookableresourcecategoryid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bookableresourcecategoryid | uniqueidentifier | pk |  | confirmé |

## bookableresourcecategoryassn
- Clé primaire : bookableresourcecategoryassnid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bookableresourcecategoryassnid | uniqueidentifier | pk |  | confirmé |
| resource | lookup |  | bookableresource.bookableresourceid | confirmé |
| resourcecategory | lookup |  | bookableresourcecategory.bookableresourcecategoryid | confirmé |

## bookableresourcecharacteristic
- Clé primaire : bookableresourcecharacteristicid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bookableresourcecharacteristicid | uniqueidentifier | pk |  | confirmé |
| resource | lookup |  | bookableresource.bookableresourceid | confirmé |

## bookableresourcegroup
- Clé primaire : bookableresourcegroupid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bookableresourcegroupid | uniqueidentifier | pk |  | confirmé |
| childresource | lookup |  | bookableresource.bookableresourceid | confirmé |
| parentresource | lookup |  | bookableresource.bookableresourceid | confirmé |

## bookingstatus
- Clé primaire : bookingstatusid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bookingstatusid | uniqueidentifier | pk |  | confirmé |

## bot
- Clé primaire : botid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| botid | uniqueidentifier | pk |  | confirmé |

## bot_botcomponent
- Clé primaire : bot_botcomponentid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bot_botcomponentid | uniqueidentifier | pk |  | confirmé |

## bot_botcomponentcollection
- Clé primaire : bot_botcomponentcollectionid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bot_botcomponentcollectionid | uniqueidentifier | pk |  | confirmé |

## bot_environmentvariabledefinition
- Clé primaire : bot_environmentvariabledefinitionid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| bot_environmentvariabledefinitionid | uniqueidentifier | pk |  | confirmé |

## botcomponent
- Clé primaire : botcomponentid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| botcomponentid | uniqueidentifier | pk |  | confirmé |
| parentbotcomponentid | lookup |  | botcomponent.botcomponentid | confirmé |
| parentbotid | lookup |  | bot.botid | confirmé |

## botcomponent_botcomponent
- Clé primaire : botcomponent_botcomponentid

| Champ | Type | Attributs | Lookup cible (si applicable) | Statut |
|---|---|---|---|---|
| botcomponent_botcomponentid | uniqueidentifier | pk |  | confirmé |

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


