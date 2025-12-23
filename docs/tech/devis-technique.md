# Devis technique — Reddixia (toolbox agentique xPM-Pantheon)

## 1. Objet et portée
- Fournir la vue technique consolidée pour l'orchestrateur **Idexios (IA-TPG-001)** et les **Domain Packs IA-TPG-002..019** dans Microsoft Copilot Studio.
- Couvre les intégrations par défaut (**Dataverse TPG**, **SharePoint Idexios-Prime**, **Power Pages**) et les extensions optionnelles (CRM/ERP/F&O, systèmes financiers).
- Sert de référence rapide pour cadrer les travaux d'implémentation et les contrôles de conformité (sécurité, observabilité, performance).

## 2. Architecture cible (vue synthèse)
- **Expérience** : Copilot Studio (rubriques Portefeuille/Conseils/Scénarios/Livrables/Gouvernance), Power Pages pour cartes/rapports, interactions conversationnelles multi-turn.
- **Orchestration** : Idexios qualifie l'intention, résout le contexte PPP (Guid Dataverse), confirme la période (M0M1 par défaut), route vers le Domain Pack pertinent et assemble les trois formats de sortie (conversation, Adaptive Cards/rapports, process CRUD).
- **Agents** : Domain Packs FinanceOps, PortfolioOps, GovernanceOps, DeliveryOps, ProcurementOps, CommsOps ; chacun exposé comme assistant délégué avec contrat d'entrées/sorties stable.
- **Intégration** : connecteurs Dataverse et SharePoint (gabarits, procédures, cases), connecteurs optionnels vers systèmes métier, Report Factory (Azure Function/Logic App) pour la génération de livrables normalisés.
- **Gouvernance** : propagation `traceId` de bout en bout, RBAC Dataverse/SharePoint, DLP sur connecteurs, journalisation et cases sur exceptions/anomalies/approbations.

## 3. Composants techniques
- **Copilot Studio**
  - Topics/rubriques pilotés par prompts modulaires et règles de disambiguation PPP  période.
  - Configuration des assistants délégués IA-TPG-002..019 avec contrats d'appel documentés.
- **Idexios Hub**
  - Gestion des clés `portfolioId` / `programId` / `projectId` (résolution nom/code → GUID).
  - Normalisation période (`periodKey`) et confirmation utilisateur.
  - Assemblage des sorties et enrichissement des traces (`traceId`, sources consultées, règles appliquées).
- **Domain Packs**
  - FinanceOps : contrôle financier, clôture, invoicing, cash, budget, anomalies.
  - PortfolioOps : arbitrage portefeuille, risques.
  - GovernanceOps : conformité, qualité données.
  - DeliveryOps : suivi projet, WBS, livrables.
  - ProcurementOps : contrats, approvisionnement/RFP.
  - CommsOps : messages exécutifs et adoption.
- **Intégrations**
  - Dataverse TPG : tables portefeuille/programme/projet, tâches, finances périodiques, registres (risques, changements, décisions, actions).
  - SharePoint Idexios-Prime : procédures/gabarits, listes de cases/actions, preuves, versionnement.
  - Report Factory : génération DOCX/PPTX/HTML/PDF alimentée par Dataverse  gabarits SharePoint.
  - Sources personnalisées : adaptateurs vers CRM/ERP/systèmes financiers lorsque requis.

## 4. Contrats d'interface (I/O)
- **Entrées minimales** : rubrique, `traceId`, contexte PPP (GUID ou nom/code à désambiguïser), `periodKey` (M0M1 par défaut), langue/surface de sortie (conversation, carte, rapport, process).
- **Sorties standards** :
  1. **Conversation** : réponse structurée, justification, liens.
  2. **Power Pages** : Adaptive Cards (tables KPI, RAG, drill-down)  objets rapport (résumés, matrices).
  3. **Process** : opérations Dataverse/SharePoint (cases, actions, décisions, changements) déclenchées par scénario.
- **Logs/traçabilité** : décision de routage, résolution du contexte, sources interrogées, erreurs/limitations, identifiants de ressources mises à jour.

## 5. Hypothèses et dépendances
- Connecteurs Dataverse/SharePoint disponibles avec RBAC minimal défini (lecture/écriture selon profil).
- Catalogue UI (`docs/ui/adaptive-cards-contract.md`) à jour pour les colonnes/types/formats ; seuils RAG CPI/SPI centralisés.
- Mapping Dataverse (`docs/data/mapping-dataverse-champs.md`) maintenu avec statut **confirmé/à confirmer** ; aucune colonne non mappée publiée.
- Référentiels TBM/VMO/LPM appliqués pour limiter les requêtes coûteuses et prouver la valeur métier.

## 6. Non-fonctionnel
- **Performance** : réponses en <5s pour parcours standard (conversation  1 carte) ; Report Factory en asynchrone si génération lourde.
- **Sécurité** : DLP sur connecteurs, audit activé, segmentation environnement dev/test/prod, chiffrement au repos via plateformes M365/Azure.
- **Résilience** : dégradations gérées (fallback conversationnel si action indisponible), timeouts sur appels externes, idempotence des opérations CRUD.
- **Observabilité** : propagation `traceId`  `corrId`, métriques par rubriques/packs, journaux centralisés pour diagnostics (routage, erreurs, SLA).

## 7. Plan d'implémentation priorisé
1. **Activer assistants délégués** IA-TPG-002..019 et stabiliser règles de routage par rubrique  PPP  période.
2. **Finaliser contrats UI** (cartes/rapports/process) et implémenter le catalogue unique sur Power Pages  Copilot Studio.
3. **Mettre en place Report Factory** (Azure Function/Logic App) avec gabarits versionnés dans Idexios-Prime et contrat d'appel documenté.
4. **Formaliser Case Management** dans SharePoint (schéma minimal, statuts, SLA, liens preuves)  intégration Copilot.
5. **Durcir observabilité/sécurité** : propagation `traceId`, RBAC, DLP, audit, tableaux de bord de suivi (latence, erreurs, valeur livrée).

## 8. Livrables et artefacts de référence
- `archi.html` : devis d'architecture visuel (v11).
- `docs/agents/agents-registry.md` : registre des agents IA-TPG-001..019 et packs associés.
- `docs/ui/adaptive-cards-contract.md` : contrats cartes/rapports.
- `docs/data/mapping-dataverse-champs.md` : mapping tables/champs Dataverse.
- `docs/tech/technical-constraints.md` : contraintes/contournements Copilot Studio, données, UI, observabilité, sécurité.
- `docs/architecture/` : vues d'ensemble, ADR, état vs backlog.
