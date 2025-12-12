# Contraintes techniques et solutions de contournement

## Limitations actuelles

### 1. Limite de caractères instructions système (7987/8000)
**Impact**: Impossible d'ajouter références SharePoint détaillées dans les instructions  
**Solution temporaire**: Utiliser la source de connaissance SharePoint existante (Idexios-Prime)  
**Solution définitive (Option B)**: Listes SharePoint dynamiques pour actions configurables

### 2. Variables Var2 dans rubrique Conseils
**Problème**: Liste choix multiples depuis tpg_project non disponible  
**Impact**: L'utilisateur doit saisir manuellement le nom du projet  
**Solution temporaire**: Réponse libre utilisateur avec validation manuelle  
**Solution définitive**: 
- Créer liste SharePoint "Projets Actifs"
- Synchroniser avec tpg_project via Power Automate
- Intégrer comme source choix multiples dynamique

### 3. Assistants délégués non configurés
**Impact**: Idexios ne peut pas router automatiquement vers les agents spécialisés  
**Agents à configurer comme assistants**:
- HERMES-PROJ (IA-TPG-002)
- ATHENA-PORTF (IA-TPG-003)  
- THEMIS-GOV (IA-TPG-004)
- ATLAS-CTRL (IA-TPG-005)

**Prochaines étapes**:
1. Créer chaque agent dans Copilot Studio
2. Configurer comme assistant délégué dans Idexios
3. Définir conditions de routage dans instructions

### 4. Actions SharePoint non implémentées
**Impact**: Pas de lecture dynamique des templates/procédures  
**Solution**: Voir `idexios-sharepoint-integration.md` Option A

## Recommandations pour prochains agents

### HERMES-PROJ (IA-TPG-002)
**Assistants requis**: ATLAS-CTRL (pour données projet)  
**Actions Power Automate**:
- Lire template MOP depuis `/Templates/mop-template.docx`
- Récupérer données projet depuis Dataverse
- Générer document Word formaté

### ATHENA-PORTF (IA-TPG-003)
**Assistants requis**: ATLAS-CTRL, HERMES-PROJ, THEMIS-GOV  
**Sources de données**:
- Portfolio (tpg_project, tpg_projectdriver)
- Finances (tpg_financials)
- Capacity (tpg_capacitymwd)
- Controls (tpg_risks, tpg_issues)

**Actions Power Automate**:
- Calculer métriques portefeuille agrégées
- Identifier projets à risque (seuils configurables dans SharePoint)
- Générer scénarios priorisation avec algorithmes

### THEMIS-GOV (IA-TPG-004)
**Outils requis**: Microsoft Dataverse Connector  
**Actions**:
- Requêtes OData pour validation données
- Comparaison configurations vs standards
- Génération rapports écarts

**Configuration SharePoint `/Procedures/Gouvernance/`**:
- `regles-validation.json` - Règles validation données
- `seuils-alertes.json` - Seuils génération alertes
- `standards-configuration.md` - Standards attendus

### ATLAS-CTRL (IA-TPG-005)
**Sources de données primaires**:
- Task (tpg_task, tpg_taskdependency, tpg_baselines)
- Capacity (tpg_assignment, tpg_timesheet)
- Finances (tpg_financials par période)

**Alertes automatiques à implémenter**:
- Charges > 120% capacité disponible
- Écarts coûts > 10% budget
- Retards > 5 jours chemin critique
- Données manquantes colonnes obligatoires

## Évolutions prévues (Option B)

Voir `backlog/evolutions-futures.md` pour roadmap complète.
