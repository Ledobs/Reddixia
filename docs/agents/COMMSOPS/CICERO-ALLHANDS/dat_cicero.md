# Sources de données — Cicero

> **Agent** : CICERO-ALLHANDS (IA-TPG-015)
> **Domaine** : CommsOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

CICERO-ALLHANDS prépare des communications exécutives : messages clés, notes de synthèse, kits de communication et récapitulatif d’actions.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Communication/` (d’après `agents-registry.md`)
- **Types de contenus** : gabarits all-hands, FAQ, annonces, guides de style, exemples validés.

### Registre parties prenantes / canaux
- **Source** : `[À confirmer]` (SharePoint / Dataverse / autre)
- **Contenu** : audiences, canaux, ownership, calendriers de diffusion.

### Dataverse (TPG)
- **Tables candidates** : `[À confirmer]` (portefeuille/projets pour extraire faits saillants, décisions, actions).

## Permissions requises (à confirmer)

### SharePoint
- Lecture Idexios-Prime (gabarits + procédures communication).

### Dataverse
- Lecture sur les entités utilisées pour synthèses (si applicable).

## Points à clarifier
- Liste “source-of-truth” des messages/annonces (où sont-ils archivés ?) 
- Quelles règles de validation/approbation avant diffusion ?
- Liste des canaux et audiences (format + emplacement).

## Flux de données (brouillon)
1. Collecter inputs (décisions, changements, avancement).
2. Synthétiser (messages clés + risques + prochaines actions).
3. Générer le kit via gabarits.
4. Préparer plan de diffusion (canaux + audiences).
