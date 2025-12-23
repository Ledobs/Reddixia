# Reddixia

Reddixia est le **toolbox agentique** d’Idexia pour soutenir la **gestion de portefeuille / programmes / projets (TPG)**, la reddition de comptes (finances, performance, gouvernance) et la production de livrables (rapports, cartes, dossiers de décision) dans une approche **xPM (équipes hybrides humains + agents IA)**.

Le cœur de la solution est **Idexios (IA-TPG-001)**, orchestrateur conversationnel dans **Microsoft Copilot Studio**, qui :
- qualifie l’intention (rubrique),
- résout le contexte (projet / programme / portefeuille + période),
- route vers le **Domain Pack** pertinent,
- assemble les sorties (conversation, Power Pages, process),
- et trace les décisions (observabilité, cases).

---

## Liens rapides

- **Devis d’architecture (HTML v11)** : `./archi.html`
- **Solution Copilot Studio (xPM-Pantheon)** : `https://copilotstudio.preview.microsoft.com/environments/14a51a38-b4c0-eb5b-9089-fcef1e4b79f5/solutions/89228855-0fd5-f011-8544-7ced8d0679f6`
---

## Architecture – principes clés (v11)

### Sources par défaut
- **Dataverse TPG (`tpg_*`)** : données portefeuille/programmes/projets, tâches (WBS), finances par période, registres (risques, enjeux, changements, décisions, actions), etc.
- **SharePoint – Idexios-Prime** : procédures, gabarits, listes de “cases” (exceptions/anomalies/approbations), preuves et documentation opératoire.

> Des **sources personnalisées** (CRM, ERP, F&O, etc.) peuvent être arrimées au besoin via connecteurs, sans être requises par défaut.

### Rubriques Idexios (routage d’intention)
- **Portefeuille**
- **Conseils**
- **Scénarios**
- **Livrables**
- **Gouvernance**

Idexios qualifie l’intention et sélectionne le **Domain Pack utile**. Selon le domaine, d’autres rubriques ou sources complémentaires peuvent être exploitées.

### Sorties (3 formats)
1. **Conversation** (Copilot Studio) : réponse structurée, justification, liens.
2. **Power Pages** : objets de rapports et **Adaptive Cards** (navigation/drill-down).
3. **Process** : création/mise à jour d’items (Dataverse / SharePoint) quand un workflow doit être déclenché.

---

## Domain Packs (Toolbox agentique)

Les agents sont regroupés par packs afin de **séparer les responsabilités**, stabiliser les contrats d’entrées/sorties et limiter les croisements.

- **FinanceOps Pack** : analyse financière, variances, clôture, exceptions, contrôle et reddition.
- **PortfolioOps Pack** : pilotage portefeuille, priorisation, arbitrage, alignement capacité/valeur/risque.
- **GovernanceOps Pack** : conformité, qualité, contrôles, preuves, politiques/procédures.
- **DeliveryOps Pack** : pilotage projet, livrables, comptes rendus, reporting standardisé.
- **ProcurementOps Pack** : approvisionnement/RFP, analyse contrats, standardisation gabarits.
- **CommsOps Pack** : communication exécutive et adoption (kits, all-hands, messages).

> Le détail complet des agents (IA-TPG-001 à IA-TPG-019) est maintenu dans `docs/agents/`.

---

## Cadres méthodologiques – Finance & Planification

Les agents du domaine **Financiers & Planification** appliquent un comportement de **Coordinateur de Valeur IA** :

- **TBM (Technology Business Management)** : toute action “coûteuse” (requêtes, calcul, génération) doit être justifiée par l’objectif métier et la valeur attendue.
- **VMO (Value Management Office)** : priorisation des actions qui maximisent ROI/KPI et capacité à rapporter la valeur générée à chaque jalon.
- **Lean Portfolio Management (LPM)** : itérations courtes, points de contrôle, réallocation rapide (“fail fast”) si la valeur n’est pas démontrée.

### Seuils CPI/SPI (RAG)
- 🟢 **Vert** : **≥ 0.95** (cible nominale 1.00)
- 🟡 **Ambre** : **0.85 – 0.95**
- 🔴 **Rouge** : **< 0.85**

---

## Structure du dépôt (cible)

```
Reddixia/
│
├── README.md
├── archi.html                    # Devis d’architecture (v11)
│
└── docs/
    ├── architecture/             # README complet
    │   └── adr/                  # INDEX léger (décisions)
    ├── agents/                   # README complet (registre agents/packs)
    ├── data/                     # README complet (modèle + mapping)
    ├── rubriques/                # INDEX léger (1 doc par rubrique)
    ├── ui/                       # INDEX léger (contrats cartes/rapports)
    ├── finance/                  # INDEX léger (cadres TBM/VMO/LPM, RAG, etc.)
    ├── templates/                # README complet (gabarits réutilisables)
    ├── tech/                     # INDEX léger (composantes, observabilité, sécurité)
    ├── governance/               # INDEX léger (politiques, contrôles)
    └── roadmap/                  # INDEX léger (évolutions futures)
```

---

## Documentation (où trouver quoi)

- `docs/architecture/` : état de l’architecture, décisions (ADR), conventions de diagrammes.
- `docs/agents/` : registre agents, Domain Packs, contrats d’entrées/sorties.
- `docs/rubriques/` : scénarios + spécifications des sorties par rubrique.
- `docs/data/` : modèle de données TPG, mapping Dataverse, structure SharePoint Idexios-Prime.
- `docs/ui/` : catalogue Adaptive Cards + rapports.
- `docs/finance/` : TBM/VMO/LPM, RAG, définitions et règles financières (agnostiques du système).
- `docs/tech/` : composantes Copilot Studio, connecteurs/actions, sécurité, observabilité.
- `docs/roadmap/` : évolutions et backlog.

---

## Licence

**Propriétaire Idexia.**  
Ce dépôt est destiné aux collaborateurs Idexia autorisés. Toute utilisation, reproduction ou distribution est soumise à une autorisation écrite préalable d’Idexia.
