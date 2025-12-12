# Guide d'intégration SharePoint - Idexios-Prime

## Structure de répertoires (Option A - Implémentée)
# https://idexia365.sharepoint.com/sites/Idexios/Prime/

├── Procedures/
│ ├── Portefeuille/
│ │ ├── analyse-portefeuille-procedure.md
│ │ ├── scenarios-priorisation-methode.md
│ │ └── preparation-comites-guide.md
│ ├── Projets/
│ │ ├── mop-procedure.md
│ │ ├── compte-rendu-structure.md
│ │ └── registres-maintenance.md
│ ├── Pilotage/
│ │ ├── consolidation-donnees.md
│ │ ├── detection-anomalies.md
│ │ └── rapports-avancement.md
│ ├── Comites/
│ │ ├── ordre-du-jour-type.md
│ │ ├── questions-chefs-projet.md
│ │ └── decisions-suivi.md
│ └── Gouvernance/
│ ├── regles-validation.md
│ ├── standards-configuration.md
│ └── audit-conformite.md
├── Templates/
│ ├── mop-template.docx
│ ├── compte-rendu-template.docx
│ ├── rapport-executif-template.pptx
│ ├── tableau-projets.xlsx
│ └── synthese-comite-template.docx
├── Knowledge-Base/
│ ├── definitions-TPG.md
│ ├── calculs-metriques.md
│ ├── meilleures-pratiques.md
│ └── faq-utilisateurs.md
└── Doc-Technique/
├── (fichiers PDF existants préservés)
└── architecture-solution.md


## Configuration dans Copilot Studio

### Source de connaissance existante
- **Nom**: Idexios-Prime  
- **Type**: SharePoint  
- **URL**: https://idexia365.sharepoint.com/sites/Idexios/Prime/  
- **Statut**: Prêt

### Utilisation par les rubriques

#### Rubrique: Portefeuille
**Documents référencés**:
- `/Procedures/Portefeuille/analyse-portefeuille-procedure.md`
- `/Templates/tableau-projets.xlsx`

**Instructions**: Lire la procédure d'analyse pour structurer la synthèse. Utiliser format tableau du template.

#### Rubrique: Conseils
**Documents référencés**:
- `/Procedures/Comites/ordre-du-jour-type.md`
- `/Procedures/Comites/questions-chefs-projet.md`

#### Rubrique: Gouvernance
**Documents référencés**:
- `/Procedures/Gouvernance/`
- `/Templates/rapport-executif-template.pptx`

## Roadmap Option B - Listes dynamiques

Voir `backlog/evolutions-futures.md` pour détails complets.

**Listes SharePoint à créer**:
1. **Actions Configurables**
2. **Templates Réponses**  
3. **Règles Métier**
4. **Projets Actifs** (sync tpg_project)

**Avantages**:
- Maintenance sans modification code agent
- Versioning automatique
- Gouvernance accès SharePoint
- Synchronisation temps réel
