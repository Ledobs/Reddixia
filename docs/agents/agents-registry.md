# Registre des Agents Reddixia

## Vue d'ensemble

Ce registre décrit l'ensemble des agents IA de l'écosystème Reddixia pour la gestion du portefeuille de projets TPG (Transformation Projet Gouvernance). Chaque agent a un rôle spécialisé et collabore avec les autres pour fournir une solution complète de gestion de projet.

---

## IA-TPG-001 - Idexios (Hub / Méta-orchestrateur)

### Étymologie

Idexios - En référence à son étymologie (ce qui extrait et déploie les concepts), Idexios est l'agent orchestrateur central qui transforme les intentions stratégiques en actions coordonnées.

### Caractéristiques

- **Code**: IA-TPG-001
- **Rôle**: Hub / méta-orchestrateur
- **Mission**: Agent orchestrateur qui utilise tous les autres agents et évalue l'état du portefeuille. Route les questions vers ATHENA-PORTF, ATLAS-CTRL, HERMES-PROJ, THEMIS-GOV, IRIS-RISK, GAIA-DATA, APOLLO-CHANGE.
- **Modèle**: GPT-5 Auto
- **Outils**: Office 365 Users
- **Statut**: En cours

### Pré-requis

- Configuration de tous les agents comme assistants
- Bibliothèque SPO: `/Idexios-Prime/Procedures/`
- Requêtes pour orienter vers les bons agents

### Notes

La rubrique Conseils nécessite intégration liste choix multiples depuis tpg_project (Variable Var2 temporaire).

---

## IA-TPG-002 - HERMES-PROJ (Chefs de projet)

### Étymologie

Hermès, messager des dieux et dieu des voyageurs. Coordonne et communique.

### Caractéristiques

- **Code**: IA-TPG-002
- **Rôle**: Compagnon des chefs de projet
- **Mission**: Génère MOP, comptes rendus, ordres du jour, registres. Traduit données TPG en plans d'action.
- **Modèle**: GPT-5 Auto
- **Statut**: En cours

### Pré-requis

- Configuration agent PCO comme assistant
- Bibliothèque SPO: `/Idexios-Prime/Procedures/Projets/`
- Gabarits de documents et manuel d'opération

---

## IA-TPG-003 - ATHENA-PORTF (Conseiller portefeuille)

### Étymologie

Athéna, déesse de la sagesse et stratégie. Décisions réfléchies, scénarios, priorisation.

### Caractéristiques

- **Code**: IA-TPG-003
- **Rôle**: Conseiller portefeuille (scénarios, priorisation)
- **Mission**: Analyse TPG, projets sensibles, synthèses comités, scénarios de priorisation.
- **Modèle**: GPT-5 Auto
- **Statut**: En essais

### Pré-requis

- Agents PCO et Projets comme assistants
- Bibliothèque SPO: `/Idexios-Prime/Procedures/Portefeuille/`
- Accès registres et données projet

### Notes

Anciennement DonCorleone

---

## IA-TPG-004 - THEMIS-GOV (Auditeur conformité & qualité solution)

### Étymologie

Thémis, déesse de la justice et de l'ordre. Veille au respect des règles.

### Caractéristiques

- **Code**: IA-TPG-004
- **Rôle**: Auditeur de conformité & qualité solution
- **Mission**: Surveille paramètres, configurations, qualité données pour repérer écarts et non-conformités.
- **Modèle**: GPT-5 Auto
- **Outils**: Microsoft Dataverse Connector
- **Statut**: En cours

### Pré-requis

- Configuration agents comme assistants
- Bibliothèque SPO: `/Idexios-Prime/Procedures/Gouvernance/`
- Documents configuration

---

## IA-TPG-005 - ATLAS-CTRL (Contrôleur/analyste PCO)

### Étymologie

Atlas qui porte le monde sur ses épaules. Soutient la structure des plans, charges, coûts.

### Caractéristiques

- **Code**: IA-TPG-005
- **Rôle**: Contrôleur/analyste PCO
- **Mission**: Consolide efforts, coûts, échéanciers, risques. Détecte anomalies, prépare rapports.
- **Modèle**: GPT-5 Auto
- **Statut**: En cours

### Pré-requis

- Bibliothèque SPO: `/Idexios-Prime/Procedures/Pilotage/`
- Gabarits et manuel d'opération
- Rubriques et requêtes suggérées structurées

---

## IA-TPG-006 - IRIS-RISK (Analyste et gardien registre des risques)

### Étymologie

Iris, déesse messagère. Fait le lien entre signaux dispersés et registre de risques clair.

### Caractéristiques

- **Code**: IA-TPG-006
- **Rôle**: Analyste et gardien du registre des risques
- **Mission**: Structure registres risques, analyse données TPG, croise signaux, met en évidence vulnérabilités.
- **Modèle**: GPT-5 Auto
- **Statut**: Non démarré

### Pré-requis

- Registres risques projets/portefeuille
- Matrice probabilité/impact
- Politique gestion des risques

---

## IA-TPG-007 - GAIA-DATA (Gardienne données de référence)

### Étymologie

Gaïa, la Terre-mère, fondation du monde. Base sur laquelle tout repose.

### Caractéristiques

- **Code**: IA-TPG-007
- **Rôle**: Gardienne des données de référence
- **Mission**: Veille qualité et cohérence données de référence TPG. Compare référentiels entre systèmes.
- **Modèle**: GPT-5 Auto
- **Statut**: Non démarré

### Pré-requis

- Dictionnaire de données
- Listes de choix TPG
- Référentiels maîtres Finances/RH/Org

---

## IA-TPG-008 - APOLLO-CHANGE (Conseiller adoption et gestion changement)

### Étymologie

Apollon, dieu de la lumière et connaissances. Éclaire les impacts des changements.

### Caractéristiques

- **Code**: IA-TPG-008
- **Rôle**: Conseiller adoption et gestion du changement
- **Mission**: Transforme décisions en plans de changement concrets. Plans communication, formation, accompagnement.
- **Modèle**: GPT-5 Auto
- **Statut**: Non démarré

### Pré-requis

- Catalogue formations
- Gabarits plans communication
- Cartographie parties prenantes

---

## Tableau récapitulatif

| Code | Nom | Rôle | Statut | Modèle |
|------|-----|------|--------|--------|
| IA-TPG-001 | Idexios | Hub / Méta-orchestrateur | En cours | GPT-5 Auto |
| IA-TPG-002 | HERMES-PROJ | Chefs de projet | En cours | GPT-5 Auto |
| IA-TPG-003 | ATHENA-PORTF | Conseiller portefeuille | En essais | GPT-5 Auto |
| IA-TPG-004 | THEMIS-GOV | Auditeur conformité | En cours | GPT-5 Auto |
| IA-TPG-005 | ATLAS-CTRL | Contrôleur PCO | En cours | GPT-5 Auto |
| IA-TPG-006 | IRIS-RISK | Gardien registre risques | Non démarré | GPT-5 Auto |
| IA-TPG-007 | GAIA-DATA | Gardienne données | Non démarré | GPT-5 Auto |
| IA-TPG-008 | APOLLO-CHANGE | Gestion changement | Non démarré | GPT-5 Auto |
