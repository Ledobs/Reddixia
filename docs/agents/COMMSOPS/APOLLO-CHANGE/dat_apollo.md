# DAT — APOLLO-CHANGE (IA-TPG-008)

> **Agent** : APOLLO-CHANGE  
> **Code** : IA-TPG-008  
> **Identifiant** : APOLLO-CHANGE  
> **Domain Pack** : CommsOps  
> **Statut** : Draft  
> **Dernière mise à jour** : 2025-12-29 16:56:16 EST

## Rôle
Agent de conduite du changement et de communication : il transforme les décisions et évolutions du portefeuille en messages clairs, cohérents et ciblés (gestion des annonces, kits de communication, FAQ, messages Teams/Outlook).

## Mission
Soutenir l’adoption et la compréhension des changements liés au portefeuille, en assurant la cohérence du narratif, la segmentation des audiences et la traçabilité des communications.

## Déclencheurs typiques
- Nouvelle décision / changement approuvé (jalon, scope, priorités, budget)
- Publication d’un statut de portefeuille ou d’un projet majeur
- Préparation d’un comité (message d’ouverture, points clés, FAQ)

## Données d’entrée
- Décisions et jalons (Dataverse TPG)
- Indicateurs de santé / risques (Dataverse TPG)
- Bibliothèque SharePoint Idexios‑Prime (gabarits, charte, visuels)
- SharePoint Idexios‑Prime : `/Idexios-Prime/Procedures/Communication/` (d’après `agents-registry.md`)
- Répertoire des parties prenantes / audiences (M365 / Dataverse) — à confirmer

## Données de sortie
- Messages d’annonce (Teams / Outlook) prêts à diffuser
- Kits de communication (FAQ, points de discussion, visuels à référencer)
- Calendrier / log de communications (trace, version, audience) — à confirmer

## Sources / Tables (Dataverse TPG)
- tpg_project, tpg_program
- tpg_decision (ou équivalent) — à confirmer
- tpg_risk, tpg_issue
- tpg_stakeholder (ou équivalent) — à confirmer

## Règles de validation et contrôles
- Chaque message référence un objet source (projet/programme/décision) et une date de diffusion
- Audience obligatoire (ex.: direction, gestionnaires, équipes, partenaires)
- Vocabulaire et ton conformes au lexique Idexios / organisation
- Éviter les termes non confirmés : marquer « À confirmer » quand nécessaire

## Lignes d’action BPMN candidates
| Ligne d’action | Déclencheur | Entrées | Traitement | Sorties |
|---|---|---|---|---|
| COMMS-01 • Transformer une décision en annonce | Décision approuvée | Décision + projet/programme | Générer message + FAQ + audience | Annonce prête + log |
| COMMS-02 • Préparer kit d’adoption | Changement majeur | Impacts + calendrier | Construire kit (FAQ, points clés, supports) | Kit + plan diffusion |

## Hypothèses et points à confirmer
- Schéma d’audience (groupes M365, canaux Teams) à confirmer
- Format attendu des logs (Dataverse vs SharePoint) à confirmer

## Accès / permissions (à confirmer)
- SharePoint Idexios‑Prime : lecture sur les bibliothèques de gabarits
- Dataverse : lecture sur les tables pertinentes projet/portefeuille si utilisées
