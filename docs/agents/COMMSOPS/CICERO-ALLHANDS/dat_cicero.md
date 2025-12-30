# DAT — CICERO-ALLHANDS (IA-TPG-017)

> **Agent** : CICERO-ALLHANDS  
> **Code** : IA-TPG-017  
> **Identifiant** : CICERO-ALLHANDS  
> **Domain Pack** : CommsOps  
> **Statut** : Draft  
> **Dernière mise à jour** : 2025-12-29 16:56:16 EST

## Rôle
Agent de communication exécutive : il prépare des messages « all‑hands », des synthèses de portefeuille, des scripts de présentation et des Q&A à partir des informations opérationnelles.

## Mission
Donner une version « direction » des informations projet/portefeuille : claire, concise, orientée décision et alignement.

## Déclencheurs typiques
- Préparation d’un all‑hands / rencontre de direction
- Nouveau bilan mensuel / trimestriel
- Besoin d’un message de cadrage ou d’alignement

## Données d’entrée
- Synthèses et KPIs portefeuille (Dataverse TPG / Power BI) — à confirmer
- Décisions / risques majeurs (Dataverse TPG)
- Messages de référence (SharePoint Idexios‑Prime : discours, lignes directrices)
- SharePoint Idexios‑Prime : `/Idexios-Prime/Procedures/Communication/` (d’après `agents-registry.md`)

## Données de sortie
- Script all‑hands (intro, messages clés, appels à l’action)
- Q&A / points de discussion pour direction
- Résumé exécutif (1 page) pour diffusion interne

## Sources / Tables (Dataverse TPG)
- tpg_portfolio (ou équivalent) — à confirmer
- tpg_project, tpg_program
- tpg_decision (ou équivalent) — à confirmer
- tpg_kpi / tables d’indicateurs (ou vues) — à confirmer

## Règles de validation et contrôles
- Messages clés alignés aux objectifs / priorités du portefeuille
- Chiffres cités = source explicitée (table, période, filtre)
- Ton « direction » : synthétique, sans jargon technique inutile

## Lignes d’action BPMN candidates
| Ligne d’action | Déclencheur | Entrées | Traitement | Sorties |
|---|---|---|---|---|
| COMMS-10 • Produire synthèse exécutive | Bilan périodique | KPIs + risques + décisions | Synthèse + narration + messages clés | Résumé 1 page |
| COMMS-11 • Générer Q&A all‑hands | Préparation rencontre | Sujets sensibles + changements | Créer Q&A + points de discussion | Paquet Q&A |

## Hypothèses et points à confirmer
- Source officielle des KPIs (Power BI dataset vs Dataverse) à confirmer
- Format de sortie préféré (DOCX/HTML/PowerPoint) à confirmer
- Code agent à valider (une version précédente mentionnait IA-TPG-015)

## Accès / permissions (à confirmer)
- SharePoint Idexios‑Prime : lecture sur gabarits + procédures communication
- Dataverse : lecture sur les entités utilisées pour synthèses (si applicable)
