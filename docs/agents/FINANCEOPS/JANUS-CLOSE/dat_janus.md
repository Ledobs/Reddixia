# DAT — JANUS-CLOSE (IA-TPG-009)

> **Agent** : JANUS-CLOSE  
> **Code** : IA-TPG-009 — à confirmer  
> **Identifiant** : JANUS-CLOSE  
> **Domain Pack** : GovernanceOps  
> **Statut** : Draft  
> **Dernière mise à jour** : 2025-12-29 16:56:16 EST

## Rôle
Agent de clôture et de gouvernance : il prépare les éléments de fermeture de phase/projet (livrables, décisions, leçons apprises) et vérifie la complétude des dossiers.

## Mission
Fiabiliser les transitions (fin de phase, clôture) en s’assurant que les décisions, livrables et métriques sont documentés.

## Déclencheurs typiques
- Fin de phase / fin de projet
- Demande de fermeture par le VMO
- Audit / revue de conformité

## Données d’entrée
- Liste des livrables et statuts (Dataverse TPG / SharePoint) — à confirmer
- Décisions, risques résiduels, approbations (Dataverse TPG) — à confirmer
- Rétrospective / leçons apprises (Teams/Forms/SharePoint) — à confirmer
- SharePoint Idexios‑Prime : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`) — à confirmer

## Données de sortie
- Dossier de clôture (checklist + preuves)
- Résumé de leçons apprises et recommandations
- Statut de conformité (complet / incomplet + éléments manquants)

## Sources / Tables (Dataverse TPG)
- tpg_deliverable — à confirmer
- tpg_decision, tpg_risk, tpg_issue — à confirmer
- tpg_project

## Règles de validation et contrôles
- Checklist de clôture : livrables obligatoires présents et approuvés
- Traçabilité : lien vers preuves (URL SharePoint / enregistrement) — à confirmer
- Tout manquant doit être listé clairement (owner + date cible)

## Lignes d’action BPMN candidates
| Ligne d’action | Déclencheur | Entrées | Traitement | Sorties |
|---|---|---|---|---|
| GOV-01 • Préparer dossier de clôture | Fin phase/projet | Livrables + décisions + preuves | Vérifier complétude + compiler | Dossier + manquants |

## Hypothèses et points à confirmer
- Définition exacte du processus de clôture (gates) à confirmer
- Emplacement des preuves (SharePoint libraries) à confirmer
- Domain Pack à confirmer (le fichier est rangé sous FINANCEOPS dans le repo)

## Accès / permissions (à confirmer)
- SharePoint Idexios‑Prime : lecture sur bibliothèques de preuves
- Dataverse : lecture sur projet/livrables/décisions si disponibles
