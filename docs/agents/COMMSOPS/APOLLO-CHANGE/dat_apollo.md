# Sources de données — Apollo

> **Agent** : APOLLO-CHANGE (IA-TPG-008)
> **Domaine** : CommsOps
> **Dernière mise à jour** : 29 décembre 2025
> **Statut** : Brouillon (à compléter)

## Vue d'ensemble

APOLLO-CHANGE aide à transformer des décisions/évolutions en plans de changement concrets (communication, formation, accompagnement), avec messages clés, FAQ, guides et métriques d’adoption.

## Sources attendues (à confirmer)

### SharePoint
- **Site** : Idexios-Prime
- **Bibliothèque / chemin** : `/Idexios-Prime/Procedures/Communication/` (d’après `agents-registry.md`)
- **Types de contenus** : gabarits de communication (all-hands, FAQ, annonces), plans de com/formation, guides d’adoption.

### Dataverse (TPG)
- **Tables candidates** : `[À confirmer]` (ex: projets/portefeuille pour listes de diffusion ou segmentation par unités/équipes).
- **Champs candidats** : `[À confirmer]` (statut, sponsor, parties prenantes, calendrier jalons).

### Autres sources
- **Feedback utilisateurs** : `[À confirmer]` (tickets, sondages, Teams, commentaires) + modalités d’accès.

## Permissions requises (à confirmer)

### SharePoint
- Lecture sur Idexios-Prime (au minimum) + accès aux bibliothèques de gabarits.

### Dataverse
- Lecture sur tables pertinentes projet/portefeuille si utilisées.

## Points à clarifier
- Quelles sources “feedback” (Teams, ITSM, forms) sont officiellement accessibles et où ?
- Existe-t-il un registre des parties prenantes/canaux (Dataverse vs SharePoint vs autre) ?
- Quels KPIs d’adoption sont attendus (baseline + fréquence) ?

## Flux de données (brouillon)
1. Lire la décision/changement (source: comité / note / ticket).
2. Identifier impacts & personas (référentiel parties prenantes).
3. Produire kit de com/formation (gabarits SharePoint).
4. Publier / suivre adoption (feedback + métriques).
