# Composantes techniques — Toolbox Reddixia (Copilot Studio)

> Référence visuelle : `./archi.html` (architecture v11).  
> Portée : composantes d’implémentation pour Idexios (IA-TPG-001), ses Domain Packs (IA-TPG-002..019), et les intégrations Dataverse / SharePoint / Power Pages.

---

## 1) Vue en couches

### Couche Expérience (UX)
- **Microsoft Copilot Studio**  
  - Topics / Rubriques (Portefeuille, Conseils, Scénarios, Livrables, Gouvernance)  
  - Orchestration conversationnelle (clarifications, confirmations période, disambiguation projet/programme/portefeuille)
- **Power Pages**  
  - Affichage de **rapports** (objets) et **Adaptive Cards** (tables/KPI/drill-down)  
  - Navigation multi-niveaux (Portefeuille → Programme → Projet)

### Couche Orchestration (Hub)
- **Idexios (IA-TPG-001)**  
  - Qualification d’intention (rubrique)  
  - Résolution du contexte (GUID Dataverse : `projectId` / `programId` / `portfolioId`)  
  - Gestion de la période (défaut M0+M1, confirmation utilisateur)  
  - Routage vers Domain Packs / agents spécialisés  
  - Assemblage des sorties (3 formats)  
  - Gouvernance de l’exécution (traceId, règles, création de cases)

### Couche Domain (Agentique)
- **Domain Packs** (groupes d’agents spécialisés)
  - **FinanceOps** (ATLAS-CTRL, JANUS-CLOSE, VESTA-INVOICE, PLUTUS-ANOM, CASSANDRA-FQA, MERCURY-COLLECT, POSEIDON-CASH, CERES-BUDGET)
  - **PortfolioOps** (ATHENA-PORTF, IRIS-RISK)
  - **GovernanceOps** (THEMIS-GOV, GAIA-DATA, MINERVA-DATA)
  - **DeliveryOps** (HERMES-PROJ)
  - **ProcurementOps** (JUNO-CONTRACT, VULCAN-PROC)
  - **CommsOps** (APOLLO-CHANGE, CICERO-ALLHANDS)

### Couche Intégration (Actions / Connecteurs)
- **Connecteur Dataverse** (requêtes OData / opérations CRUD selon droits)  
- **Connecteur SharePoint**  
  - Bibliothèques : templates, procédures, preuves  
  - Listes : **cases** (exceptions/anomalies/approbations), actions, décisions (si retenu)
- **Connecteurs “Sources personnalisées” (optionnel)**  
  - Arrimage possible à un **système financier** (ou CRM/ERP/F&O, etc.) selon besoins de reddition.  
  - Non requis dans la configuration par défaut.

### Couche Automatisation / Production
- **Report Factory (Azure Function / Logic App)**  
  - Génération de documents et artefacts (Word/PPT/HTML/PDF selon standard)  
  - Alimentation par Dataverse + gabarits SharePoint (Idexios-Prime)  
  - Dépôt des livrables dans SharePoint et/ou exposition via Power Pages

### Couche Gouvernance & Opérations
- **Case Management (SharePoint list)**  
  - Suivi des exceptions, anomalies, validations, approbations  
  - Statuts, propriétaires, SLA, pièces justificatives
- **Observabilité**  
  - `traceId` / `corrId` propagé (conversation → actions → agents → rapports/cases)  
  - Journalisation des décisions de routage et de transformation de données
- **Sécurité**  
  - RBAC Dataverse / SharePoint  
  - DLP / audit des connecteurs et des opérations  
  - Gouvernance des données (accès minimal, traçabilité)

---

## 2) Contrats d’interface (I/O) à stabiliser

### Clés de contexte
- **`portfolioId` / `programId` / `projectId`** : GUID Dataverse (résolution possible via code/nom + disambiguation)
- **`periodKey`** : période d’agrégation (défaut M0+M1, confirmée)  
- **`traceId`** : identifiant de corrélation de bout en bout

### Sorties (3 formats)
1. **Conversation** (Copilot Studio)  
   - réponse structurée + liens + justifications
2. **Power Pages**  
   - Adaptive Cards (tableaux KPI, RAG, drill-down)  
   - objets “rapport” (résumés, grilles, matrices)
3. **Process**  
   - écritures Dataverse / SharePoint (cases, actions, décisions, changements) quand un workflow est déclenché

---

## 3) Artefacts à maintenir (références)

- **`archi.html`** : devis d’architecture (HTML v11)  
- **`docs/agents/agents-registry.md`** : registre des agents IA-TPG-001..019  
- **`docs/agents/domain-packs-architecture.md`** : définition des packs  
- **`docs/ui/adaptive-cards-contract.md`** : catalogue des cartes & colonnes  
- **`docs/data/mapping-dataverse-champs.md`** : mapping tables/champs confirmés  
- **`docs/tech/technical-constraints.md`** : contraintes techniques et contournements

---

## 4) Critères de “Done” (technique)

- Les rubriques routent correctement vers le pack/agent attendu (tests par intention).  
- Les sorties existent dans les 3 formats (au minimum 1 carte + 1 rapport + 1 case sur scénario).  
- Chaque exécution produit un `traceId` exploitable (diagnostic + audit).  
- Les droits Dataverse/SharePoint sont minimaux et testés (RBAC) ; audit actif.
