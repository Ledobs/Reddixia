# Sources de données — Iris

> **Agent** : IRIS-RISK (IA-TPG-006)
> **Domaine** : PortfolioOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

IRIS-RISK structure les registres de risques, croise des signaux et met en évidence les vulnérabilités (projets/portefeuille).

## Sources attendues (à confirmer)

### Registres de risques
- **Source** : `[À confirmer]` (Dataverse vs SharePoint)
- **Contenu** : risques, enjeux, probabilité/impact, RAG, mitigations, owners.

### Politiques & méthode
- **Matrice probabilité/impact** : `[À confirmer]` (où est-elle stockée ?)
- **Politique gestion des risques** : `[À confirmer]` (SharePoint Idexios-Prime ?)

### Dataverse (TPG)
- **Tables candidates** : `[À confirmer]` risques, issues, action items, status reports, projets.

## Permissions requises (à confirmer)
- Lecture sur registres risques + projets.
- Lecture sur politique/méthode.

## Points à clarifier
- Le registre des risques est-il unique (portefeuille) ou par projet ?
- Quelle taxonomie (catégories, labels) et où est-elle définie ?

## Flux de données (brouillon)
1. Charger registres et taxonomie.
2. Détecter incohérences/doublons/champs manquants.
3. Croiser signaux (statuts, décisions, changements).
4. Produire synthèse + recommandations + actions.
