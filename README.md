# Reddixia

Reddixia est la boîte à outils d'Idexia dédiée au soutien de la reddition de comptes, de la reddition contractuelle et de la reddition de projets. Elle regroupe une famille d'agents spécialisés construits dans le projet idexia-xpm-pantheon, chacun inspiré des mythologies grecque et romaine, pour accompagner la gestion de projet, de portefeuille, des risques, des données et de l'adoption autour de TPG.

Les agents interagissent par l'intermédiaire de l'orchestrateur Idexios. Nommé en référence à son étymologie (ce qui extrait et déploie les concepts), Idexios est l'agent orchestrateur central qui transforme les intentions stratégiques en actions coordonnées, servant de hub intelligent pour l'ensemble de l'écosystème d'agents de gestion de projet.

---

## Contexte : idexia-xpm-pantheon

`idexia-xpm-pantheon` est le projet de référence qui héberge la famille d'agents Reddixia (Idexios : ATLAS-CTRL, HERMES-PROJ, ATHENA-PORTF, THEMIS-GOV, IRIS-RISK, GAIA-DATA, APOLLO-CHANGE, etc.).  
Il définit le modèle **xPM (eXtended Project Management)** d'Idexia, où la gestion de projet et de portefeuille est augmentée par une constellation d'agents spécialisés, coordonnés par **Idexios**.

---

## Objectifs du projet

- Outiller la reddition de comptes, contractuelle et projet dans un contexte TPG.  
- Structurer une constellation d'agents spécialisés, chacun ciblant un rôle métier précis.  
- Proposer une architecture de référence xPM réutilisable sur d'autres mandats.  
- Faciliter l'intégration avec Microsoft 365 (SharePoint Online, Teams, Dataverse, etc.).  

---

## Famille d'agents Reddixia

| Code        | Nom           | Rôle principal                                                       | Mission synthèse                                                                                          | Statut       |
|------------|---------------|----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|-------------|
| IA-TPG-001 | ATLAS-CTRL    | Contrôleur / analyste PCO                                           | Consolider efforts, coûts, échéanciers et risques, détecter les anomalies et soutenir la reddition.       | En cours    |
| IA-TPG-002 | HERMES-PROJ   | Compagnon des chefs de projet                                        | Générer MOP, comptes rendus, registres et plans d'action à partir des données TPG et des gabarits.        | En cours    |
| IA-TPG-003 | ATHENA-PORTF  | Conseiller portefeuille (scénarios, priorisation)                    | Analyser le portefeuille, préparer les synthèses pour comités et proposer des scénarios de priorisation.  | En essais   |
| IA-TPG-004 | THEMIS-GOV    | Auditeur de conformité & qualité solution                            | Surveiller paramètres, configurations et qualité des données TPG pour soutenir la gouvernance.            | En cours    |
| IA-TPG-005 | Idexios       | Hub / méta-orchestrateur                                             | Router les questions vers les bons agents et assembler une vue intégrée du portefeuille et de la solution.| En cours    |
| IA-TPG-006 | IRIS-RISK     | Analyste et gardien du registre des risques                          | Structurer et exploiter les registres de risques, croiser signaux et produire des synthèses risques.      | Non démarré |
| IA-TPG-007 | GAIA-DATA     | Gardienne des données de référence et du modèle d'information        | Veiller à la qualité, cohérence et stabilité des données maîtres entre TPG et systèmes connexes.          | Non démarré |
| IA-TPG-008 | APOLLO-CHANGE | Conseiller adoption et gestion du changement autour de la solution   | Traduire les décisions techniques en plans de communication, formation et accompagnement concrets.        | Non démarré |

---

## Structure du dépôt

```
Reddixia/
├─ README.md
├─ docs/
│  ├─ architecture-xpm.md
│  ├─ agents.md
│  └─ scenarios/
├─ agents/
│  ├─ atlas-ctrl/
│  ├─ hermes-proj/
│  ├─ athena-portf/
│  ├─ themis-gov/
│  ├─ idexios/
│  ├─ iris-risk/
│  ├─ gaia-data/
│  └─ apollo-change/
└─ .github/
   └─ workflows/
```

- `docs/` : documentation fonctionnelle et technique, diagrammes, scénarios d'usage.  
- `agents/` : configuration, prompts, scripts d'intégration et tests pour chaque agent.  

---

## Pré-requis (cible M365/TPG)

- Environnement Microsoft 365 avec SharePoint Online et Teams pour héberger procédures, gabarits et manuels d'opération.  
- Accès aux données TPG (portefeuille, projets, registres de risques, référentiels maîtres) et, au besoin, à Dataverse ou autres sources connexes.  
- Modèles d'IA (par ex. GPT-5 Auto) et connecteurs nécessaires (Microsoft 365, Dataverse, etc.).  

---

## Roadmap (indicative)

- Stabilisation des agents de base : ATLAS-CTRL, HERMES-PROJ, ATHENA-PORTF, THEMIS-GOV, Idexios.  
- Ajout progressif des agents IRIS-RISK, GAIA-DATA et APOLLO-CHANGE.  
- Publication de scénarios de référence (démonstrations TPG, ateliers, guides d'implantation).  

---

## Licence

**Propriétaire Idexia.**  
Ce dépôt est destiné aux collaborateurs Idexia autorisés. Toute utilisation, reproduction ou distribution est soumise à une autorisation écrite préalable d'Idexia.
