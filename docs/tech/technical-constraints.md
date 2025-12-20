# Contraintes techniques et solutions de contournement (Reddixia / Idexios)

Dernière mise à jour : 2025-12-20

---

## 1) Contraintes de plateforme (Copilot Studio)

### 1.1 Limites de taille des instructions / prompts
**Impact** : difficulté à embarquer des référentiels volumineux (ex. chemins SharePoint détaillés, tables complètes, règles longues).  
**Contournement** :
- Externaliser les règles / seuils / configurations dans **SharePoint (Idexios-Prime)** ou Dataverse (tables de référence).
- Charger le contexte “au besoin” via actions (éviter d’augmenter le prompt statique).

### 1.2 Assistants délégués / routage agentique
**Impact** : sans configuration des agents comme “assistants délégués”, Idexios ne peut pas router automatiquement.  
**Contournement** :
- Créer/configurer chaque agent IA-TPG-002..019 dans Copilot Studio.
- Définir les conditions de routage par **rubrique + contexte** (PPP + période).
- Stabiliser le contrat `traceId` et la structure des sorties (cards/rapports/cases).

### 1.3 Actions / connecteurs non implémentés
**Impact** : absence de lecture dynamique des gabarits/procédures ou de génération automatisée de documents.  
**Contournement** :
- Implémenter une **Report Factory** (Azure Function ou Logic App) et formaliser le contrat d’appel (inputs/outputs).
- Standardiser les chemins de gabarits dans Idexios-Prime (conventions).

---

## 2) Contraintes de données (Dataverse TPG)

### 2.1 Contexte (GUID) et drill-down
**Règle** : forage contextuel par GUID Dataverse :  
- Question PROJET → `projectId`  
- Question PROGRAMME → `programId`  
- Question PORTEFEUILLE → `portfolioId`  
**Contournement** :
- Mécanisme de disambiguation (nom/code → GUID).
- Traçabilité des résolutions dans le `traceId` (preuve).

### 2.2 Période (periodKey)
**Règle** : défaut **M0 + M1**, confirmation utilisateur obligatoire pour analyses financières/capacité ; optionnelle pour narratif.  
**Contournement** :
- Message de confirmation systématique (“Analyse M0+M1 ?”).
- Alternatives proposées : semaine / mois / trimestre / intervalle.

### 2.3 Alignement schéma / mapping
**Impact** : risque d’inventer des champs/relations.  
**Contournement** :
- Maintenir `docs/data/mapping-dataverse-champs.md` avec statut **confirmé / à confirmer**.
- Éviter de publier des colonnes UI non mappées à une source existante.

---

## 3) Contraintes UI (Adaptive Cards / Power Pages)

### 3.1 Stabilité des colonnes et formats
**Impact** : incohérences entre cartes et rapports (noms, types, formats).  
**Contournement** :
- Catalogue unique : `docs/ui/adaptive-cards-contract.md` (source of truth).
- Formats normés (dates, devise CAD, pourcentage, RAG).

### 3.2 Seuils RAG CPI/SPI (norme projet)
**Seuils** :
- 🟢 Vert : **≥ 0.95** (cible nominale 1.00)  
- 🟡 Ambre : **0.85 – 0.95**  
- 🔴 Rouge : **< 0.85**  
**Contournement** :
- Centraliser les seuils (SharePoint procédure ou table de référence) et les réutiliser partout (cards/rapports).

---

## 4) Contraintes “Finance & Planification” (cadres de décision)

Les agents FinanceOps/PortfolioOps doivent agir comme **Coordinateur de Valeur IA**.

### 4.1 TBM (Technology Business Management)
**Règle** : avant une action coûteuse (requêtes multiples, gros calcul, génération longue), justifier le coût par la valeur métier attendue.  
**Contournement** :
- Stratégie “progressive disclosure” : commencer par un résumé + top anomalies, puis détailler sur demande.
- Limiter les requêtes au périmètre (PPP + période confirmée).

### 4.2 VMO (Value Management Office)
**Règle** : prioriser les actions maximisant ROI/KPI ; à chaque jalon, rapporter la valeur livrée (pas seulement l’état).  
**Contournement** :
- Ajouter une section “valeur produite” aux rapports (gain temps, précision, décisions).

### 4.3 Lean Portfolio Management (LPM)
**Règle** : itérations courtes, points de contrôle, “fail fast” si la valeur n’est pas démontrée.  
**Contournement** :
- Gating explicite dans les rubriques Scénarios / Portefeuille (go/no-go après étape 2, etc.).

---

## 5) Contraintes d’intégration (SharePoint Idexios-Prime)

### 5.1 Case Management sur SharePoint list
**Impact** : dépendance à une structure stable (colonnes, statuts, SLA).  
**Contournement** :
- Définir un schéma minimal de case (type, statut, owner, SLA, evidenceLink, traceId).
- Standardiser l’emplacement des preuves/gabarits.

### 5.2 Gabarits / procédures
**Impact** : si les gabarits sont dispersés ou non versionnés, la génération est fragile.  
**Contournement** :
- Convention : `/Idexios-Prime/Procedures/<Domaine>/` et `/Idexios-Prime/Templates/<Domaine>/`.
- Versionnement des gabarits (changelog) et règles de nommage.

---

## 6) Contraintes d’observabilité et sécurité

### 6.1 Observabilité (traceId)
**Impact** : sans corrélation, diagnostic difficile et audit incomplet.  
**Contournement** :
- Propager `traceId` : conversation → actions → agents → rapports/cases.
- Journaliser : intention, contexte, période, sources consultées, décisions de routage.

### 6.2 Sécurité (RBAC / DLP / Audit)
**Impact** : exposition involontaire de données, connecteurs non gouvernés.  
**Contournement** :
- RBAC minimal (Dataverse/SharePoint).
- DLP sur connecteurs et environnements.
- Audit activé + revue périodique.

---

## 7) Backlog technique (priorisé)

1. **Configurer les assistants délégués** (IA-TPG-002..019) + règles de routage.  
2. **Stabiliser le contrat de sorties** (cards/rapports/process) + catalogue UI unique.  
3. **Mettre en place Report Factory** (Azure Function/Logic App) + gabarits Idexios-Prime.  
4. **Formaliser Case Management** (schéma, statuts, SLA) + intégrations.  
5. **Aligner mapping Dataverse** (tables/champs confirmés) et tests de non-régression.
