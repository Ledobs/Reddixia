# Registre des Agents Reddixia

## IA-TPG-001 - Idexios (Hub / Méta-orchestrateur)

**Étymologie**: Idexios - En référence à son étymologie (ce qui extrait et déploie les concepts), Idexios est l'agent orchestrateur central qui transforme les intentions stratégiques en actions coordonnées.

**Rôle**: Hub / méta-orchestrateur  
**Mission**: Agent orchestrateur qui utilise tous les autres agents et évalue l'état du portefeuille. Route les questions vers ATHENA-PORTF, ATLAS-CTRL, HERMES-PROJ, THEMIS-GOV, IRIS-RISK, GAIA-DATA, APOLLO-CHANGE.

**Pré-requis**:
- Configuration de tous les agents comme assistants
- Bibliothèque SPO: `/Idexios-Prime/Procedures/` 
- Requêtes pour orienter vers les bons agents

**Modèle**: GPT-5 Auto  
**Outils**: Office 365 Users  
**Statut**: En cours

**Notes**: La rubrique Conseils nécessite intégration liste choix multiples depuis tpg_project (Variable Var2 temporaire).

---

## IA-TPG-002 - HERMES-PROJ (Chefs de projet)

**Étymologie**: Hermès, messager des dieux et dieu des voyageurs. Coordonne et communique.

**Rôle**: Compagnon des chefs de projet  
**Mission**: Génère MOP, comptes rendus, ordres du jour, registres. Traduit données TPG en plans d'action.

**Pré-requis**:
- Configuration agent PCO comme assistant
- Bibliothèque SPO: `/Idexios-Prime/Procedures/Projets/`
- Gabarits de documents et manuel d'opération

**Modèle**: GPT-5 Auto  
**Statut**: En cours

---

## IA-TPG-003 - ATHENA-PORTF (Conseiller portefeuille)

**Étymologie**: Athéna, déesse de la sagesse et stratégie. Décisions réfléchies, scénarios, priorisation.

**Rôle**: Conseiller portefeuille (scénarios, priorisation)  
**Mission**: Analyse TPG, projets sensibles, synthèses comités, scénarios de priorisation.

**Pré-requis**:
- Agents PCO et Projets comme assistants
- Bibliothèque SPO: `/Idexios-Prime/Procedures/Portefeuille/`
- Accès registres et données projet

**Modèle**: GPT-5 Auto  
**Statut**: En essais

**Notes**: Anciennement DonCorleone

---

## IA-TPG-004 - THEMIS-GOV (Auditeur conformité & qualité solution)

**Étymologie**: Thémis, déesse de la justice et de l'ordre. Veille au respect des règles.

**Rôle**: Auditeur de conformité & qualité solution  
**Mission**: Surveille paramètres, configurations, qualité données pour repérer écarts et non-conformités.

**Pré-requis**:
- Configuration agents comme assistants
- Bibliothèque SPO: `/Idexios-Prime/Procedures/Gouvernance/`
- Documents configuration

**Modèle**: GPT-5 Auto  
**Outils**: Microsoft Dataverse Connector  
**Statut**: En cours

---

## IA-TPG-005 - ATLAS-CTRL (Contrôleur/analyste PCO)

**Étymologie**: Atlas qui porte le monde sur ses épaules. Soutient la structure des plans, charges, coûts.

**Rôle**: Contrôleur/analyste PCO  
**Mission**: Consolide efforts, coûts, échéanciers, risques. Détecte anomalies, prépare rapports.

**Pré-requis**:
- Bibliothèque SPO: `/Idexios-Prime/Procedures/Pilotage/`
- Gabarits et manuel d'opération
- Rubriques et requêtes suggérées structurées

**Modèle**: GPT-5 Auto  
**Statut**: En cours

---

## IA-TPG-006 - IRIS-RISK (Analyste et gardien registre des risques)

**Étymologie**: Iris, déesse messagère. Fait le lien entre signaux dispersés et registre de risques clair.

**Rôle**: Analyste et gardien du registre des risques  
**Mission**: Structure registres risques, analyse données TPG, croise signaux, met en évidence vulnérabilités.

**Pré-requis**:
- Registres risques projets/portefeuille
- Matrice probabilité/impact
- Politique gestion des risques

**Modèle**: GPT-5 Auto  
**Statut**: Non démarré

---

## IA-TPG-007 - GAIA-DATA (Gardienne données de référence)

**Étymologie**: Gaïa, la Terre-mère, fondation du monde. Base sur laquelle tout repose.

**Rôle**: Gardienne des données de référence  
**Mission**: Veille qualité et cohérence données de référence TPG. Compare référentiels entre systèmes.

**Pré-requis**:
- Dictionnaire de données
- Listes de choix TPG
- Référentiels maîtres Finances/RH/Org

**Modèle**: GPT-5 Auto  
**Statut**: Non démarré

---

## IA-TPG-008 - APOLLO-CHANGE (Conseiller adoption et gestion changement)

**Étymologie**: Apollon, dieu de la lumière et connaissances. Éclaire les impacts des changements.

**Rôle**: Conseiller adoption et gestion du changement  
**Mission**: Transforme décisions en plans de changement concrets. Plans communication, formation, accompagnement.

**Pré-requis**:
- Catalogue formations
- Gabarits plans communication
- Cartographie parties prenantes

**Modèle**: GPT-5 Auto  
**Statut**: Non démarré
