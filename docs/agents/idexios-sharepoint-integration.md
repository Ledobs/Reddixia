# Guide d'intégration SharePoint - Idexios-Prime

## Structure de répertoires (Option A - Implémentée)

### URL racine

```
https://idexia365.sharepoint.com/sites/Idexios/Prime/
```

### Arborescence complète

```
|── Procedures/
|   |── Portefeuille/
|   |   |── analyse-portefeuille-procedure.md
|   |   |── scenarios-priorisation-methode.md
|   |   └── preparation-comites-guide.md
|   |── Projets/
|   |   |── mop-procedure.md
|   |   |── compte-rendu-structure.md
|   |   └── registres-maintenance.md
|   └── Pilotage/
|       |── consolidation-donnees.md
|       |── detection-anomalies.md
|       └── rapports-avancement.md
|
|── Comites/
|   |── ordre-du-jour-type.md
|   |── questions-chefs-projet.md
|   └── decisions-suivi.md
|
|── Governance/
|   |── regles-validation.md
|   |── standards-configuration.md
|   └── audit-conformite.md
|
|── Templates/
|   |── mop-template.docx
|   |── compte-rendu-template.docx
|   |── rapport-executif-template.pptx
|   |── tableau-projets.xlsx
|   └── synthese-comite-template.docx
|
|── Knowledge-Base/
|   |── definitions-TPG.md
|   |── calculs-metriques.md
|   |── meilleures-pratiques.md
|   └── faq-utilisateurs.md
|
└── Doc-Technique/
    └── (fichiers PDF existants préservés)
```

## Configuration dans Copilot Studio

### Source de connaissance existante

**Nom:** Idexios-Prime

**Type:** SharePoint

**URL:** `https://idexia365.sharepoint.com/sites/Idexios/Prime/`

**Statut:** Prêt

### Utilisation par les rubriques

#### Rubrique: Portefeuille

**Objectif:** Analyse et priorisation du portefeuille de projets

**Dossiers SharePoint utilisés:**
- `/Procedures/Portefeuille/`
- `/Knowledge-Base/`
- `/Templates/tableau-projets.xlsx`

**Documents clés:**
- `analyse-portefeuille-procedure.md`
- `scenarios-priorisation-methode.md`
- `definitions-TPG.md`

#### Rubrique: Projets

**Objectif:** Gestion et suivi des projets individuels

**Dossiers SharePoint utilisés:**
- `/Procedures/Projets/`
- `/Templates/`

**Documents clés:**
- `mop-procedure.md`
- `compte-rendu-structure.md`
- `mop-template.docx`

#### Rubrique: Pilotage

**Objectif:** Consolidation et reporting des données

**Dossiers SharePoint utilisés:**
- `/Procedures/Pilotage/`
- `/Templates/rapport-executif-template.pptx`

**Documents clés:**
- `consolidation-donnees.md`
- `detection-anomalies.md`
- `rapports-avancement.md`

#### Rubrique: Comités

**Objectif:** Préparation et animation des comités

**Dossiers SharePoint utilisés:**
- `/Comites/`
- `/Templates/synthese-comite-template.docx`

**Documents clés:**
- `ordre-du-jour-type.md`
- `questions-chefs-projet.md`
- `decisions-suivi.md`

#### Rubrique: Gouvernance

**Objectif:** Validation et conformité des livrables

**Dossiers SharePoint utilisés:**
- `/Governance/`
- `/Knowledge-Base/meilleures-pratiques.md`

**Documents clés:**
- `regles-validation.md`
- `standards-configuration.md`
- `audit-conformite.md`

## Principes d'organisation

### Séparation des préoccupations

| Type de contenu | Emplacement | Format |
|----------------|-------------|--------|
| Procédures opérationnelles | `/Procedures/` | Markdown (.md) |
| Modèles de documents | `/Templates/` | Office (.docx, .pptx, .xlsx) |
| Documentation de référence | `/Knowledge-Base/` | Markdown (.md) |
| Règles de gouvernance | `/Governance/` | Markdown (.md) |
| Guides comités | `/Comites/` | Markdown (.md) |
| Documentation technique | `/Doc-Technique/` | PDF (existants préservés) |

### Convention de nommage

- **Fichiers Markdown:** `description-type.md` (ex: `analyse-portefeuille-procedure.md`)
- **Templates Office:** `nom-template.extension` (ex: `mop-template.docx`)
- **Pas d'espaces:** Utiliser des tirets `-` pour la lisibilité
- **Langue:** Français pour tous les fichiers

### Gestion des versions

- SharePoint gère automatiquement l'historique des versions
- Les fichiers PDF existants dans `/Doc-Technique/` sont préservés
- Pas de duplication entre dossiers

## Mapping avec l'architecture agent

### Idexios-Prime (IA-TPG-001)

**Rôle:** Chef d'orchestre TPG - Coordination générale

**Sources SharePoint:**
- Toutes les sections pour vue d'ensemble
- Focus sur `/Governance/` et `/Knowledge-Base/`

### Atlas (IA-TPG-005)

**Rôle:** Consolidation et reporting

**Sources SharePoint:**
- `/Procedures/Pilotage/`
- `/Templates/rapport-executif-template.pptx`
- `/Templates/tableau-projets.xlsx`

### Autres agents spécialisés

Chaque agent accède aux sections pertinentes selon son domaine d'expertise (Portefeuille, Projets, Comités).

## Migration et maintenance

### Étapes de migration

1. **Audit du contenu existant** - Inventaire des documents actuels
2. **Création structure** - Mise en place des dossiers
3. **Classification documents** - Attribution à la bonne catégorie
4. **Migration fichiers** - Déplacement vers nouvelle structure
5. **Validation** - Vérification accessibilité Copilot Studio
6. **Formation utilisateurs** - Guide d'utilisation

### Maintenance continue

- **Revue trimestrielle** de la pertinence des documents
- **Archivage** des procédures obsolètes
- **Mise à jour** des templates selon évolution besoins
- **Monitoring** utilisation via Copilot Studio analytics
