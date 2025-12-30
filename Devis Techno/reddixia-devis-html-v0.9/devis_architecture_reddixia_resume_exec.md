# Reddixia — Résumé exécutif (devis technique HTML)

> Dernière génération : 2025-12-29 17:21:39 EST

## Objet
Reddixia est une **toolbox agentique** centrée sur la **gestion de portefeuille TPG**, avec un **orchestrateur conversationnel** (IDEXIOS-HUB) dans **Microsoft Copilot Studio**. Le but : accélérer l’analyse, la production de conseils, les scénarios et les livrables, tout en gardant de la traçabilité.

## Architecture cible (niveau 1)
- **Canaux** : Copilot Studio (conversation), Power Pages / cartes (diffusion).
- **Orchestration** : IDEXIOS-HUB route les demandes vers des agents spécialisés par domaine.
- **Données** : Dataverse (tables `tpg_*`) + SharePoint Idexios-Prime (référentiel de modèles/livrables).
- **Automatisation** : Power Automate + serveurs MCP (outillage, intégrations, journalisation).
- **Gouvernance** : règles d’accès, DLP/Purview, observabilité (Log Analytics).

## Domain Packs (périmètre)
- **PortfolioOps** : analyse portefeuille, capacité, scénarios.
- **GovernanceOps** : contrôles, risques, conformité, sécurité.
- **FinanceOps** : collecte, anomalies, clôture, encaissements, budget.
- **DeliveryOps** : exécution projet, changement, industrialisation.
- **CommsOps** : communications, adoption, comptes rendus.
- **ProcurementOps** : achats, demandes, suivi, FQA.

## Rubriques de sortie
- **Portefeuille** : portrait consolidé, signaux, priorités.
- **Conseils** : recommandations actionnables et traçables.
- **Scénarios** : simulations, impacts, options.
- **Livrables** : documents, gabarits, artefacts diffusables.

## Seuils de performance (repères)
- **Vert** : CPI/SPI ≥ 0.95  
- **Ambre** : 0.85 ≤ CPI/SPI < 0.95  
- **Rouge** : CPI/SPI < 0.85  

## Principes de qualité
- Résultat **sourcé** (Dataverse / SharePoint), liens de preuve.
- Quand l’information est incomplète : indiquer **« À confirmer »** plutôt que laisser un vide.
- Journalisation par agent : décisions, exceptions, erreurs.

## Prochaines étapes proposées
1. Valider les tables `tpg_*` effectivement disponibles et les champs clés.
2. Confirmer la structure SharePoint (bibliothèques, gabarits, conventions).
3. Spécifier les règles d’accès (groupes, scopes, segmentation par pack).
4. Définir les scénarios de test (nominal, données manquantes, anomalies).
5. Déployer un pilote sur un sous-ensemble de projets/portefeuilles.

---
Pack HTML : index + index technique + pages DOM (domaines/rubriques) + pages CMP (agents).
