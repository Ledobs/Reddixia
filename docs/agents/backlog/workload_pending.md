# Aide-mémoire François Breton
Ce document sert d'aide-mémoire afin de reprendre le travail là où on est rendu lors d'une scéance de vibe-coding. 

À la fin d'une séance, prévoir laisser une trace en faisant un compte rendu 

## Compte rendu 
Voici un résumé des requis de conception pour réaliser HERMES-PROJ (IA-TPG-002) lundi, sous forme de checklist “implémentation”.
L'agent est en conception ici https://copilotstudio.preview.microsoft.com/environments/14a51a38-b4c0-eb5b-9089-fcef1e4b79f5/bots/d295c02c-f2dd-f011-8406-7ced8d0595a6/overview


1) Objectif fonctionnel

Produire / mettre à jour des livrables projet standardisés : MOP, ordre du jour (ODJ), compte rendu (CR), plan d’action, checklists, registres (actions/décisions/changements, + risques/enjeux si périmètre).

Traduire des données TPG en contenus copier-coller / publiables pour l’équipe et les parties prenantes.

2) Périmètre et sources de connaissances (minimum viable)
Dataverse TPG (tpg_*) — requis

Portfolio : projet/programme/portefeuille, statuts, parties prenantes, objectifs.

Task : WBS, jalons, dépendances, (chemin critique si exposé).

Controls : décisions, actions, changements (et risques/enjeux si utilisés).

SharePoint — requis

Idexios-Prime :

Manuel d’opération des projets (MOP)

Gabarits (CR/ODJ/plan d’action/checklists/synthèses)

Procédures + conventions (structure, nomenclature, preuves)

Optionnels (si activés dans ton instance)

Capacity : affectations, charge/capacité, effort réel (utile pour sections “capacité/charge”).

Finances : uniquement si le livrable inclut une reddition chiffrée.

Case Management (SharePoint list) : pour tracer exceptions/anomalies/approbations.

3) Contrats d’entrée (ce que l’agent doit exiger / résoudre)

Contexte obligatoire : niveau projet/programme/portefeuille + ancrage GUID (projectId, programId, portfolioId)

Résolution possible via nom/code + disambiguation.

Période :

Par défaut M0 + M1 si la demande touche statut chiffré / effort / capacité / finances

Confirmation utilisateur si la réponse implique de la reddition chiffrée.

Livrable attendu : CR / ODJ / MOP / plan d’action / checklist / registre / synthèse comité.

4) Règles de comportement (qualité & conformité)

Zéro chiffres inventés : tout indicateur doit venir des sources (ou calcul explicite).

Signalement des manques : si un champ/colonne n’est pas accessible → marquer [MANQUANT], impact, puis proposer action corrective (champ à exposer, vue à créer, procédure).

Traçabilité : inclure sources consultées et propager un traceId si disponible.

Sortie actionnable : structure standard, tableaux, propriétaires, échéances.

5) Sorties à produire (3 formats)

Conversation : réponse structurée + tableaux + “prochaines actions”.

Power Pages (si branché) : Adaptive Cards (ODJ/CR/plan d’action format table).

Process (si déclenché) : propositions d’écritures Dataverse/SharePoint (actions/décisions/changements/cases).

6) Gabarits de livrables (à stabiliser dans Idexios-Prime)

Chemins de templates stables, ex. :

/Idexios-Prime/Templates/Projets/CR/

/Idexios-Prime/Templates/Projets/ODJ/

/Idexios-Prime/Templates/Projets/Plans/

/Idexios-Prime/Procedures/Projets/

Conventions de nommage (ex. CR_<Projet>_<YYYY-MM-DD>.docx).

7) Implémentation Copilot Studio (requis techniques)

Créer l’agent HERMES-PROJ avec :

Message d’accueil

Instructions (tes règles en 7 500 caractères)

Sources: Dataverse + Idexios-Prime

Préparer les actions connecteurs nécessaires :

Lecture Portfolio/Task/Controls (par GUID + période)

Lecture gabarits/procédures SharePoint

(Optionnel) création/mise à jour d’actions/décisions/cases

Prévoir l’appel depuis Idexios (assistant délégué / routage via rubrique Livrables).

8) Tests (scénarios minimum à valider)

ODJ : “Prépare l’ordre du jour du comité de Projet X” → table points/décisions attendues.

CR : “Génère le compte rendu à partir des décisions/actions de la semaine” → décisions + actions (owner/échéance).

Plan d’action : “Mets à jour le plan d’action et liste les bloqueurs” → top bloqueurs + actions priorisées.

Cas [MANQUANT] : champ non exposé → message clair + recommandation corrective.

Mini-plan de réalisation (lundi)

Brancher sources (Portfolio/Task/Controls + Idexios-Prime)

Gabarits & conventions de sortie (CR/ODJ/Plan d’action)

Actions de lecture (par GUID + période)

Scripts de réponse (structures standard)

Tests 4 scénarios + traceId + gestion [MANQUANT]

Si tu me dis quelles actions Dataverse/SharePoint sont déjà disponibles dans Copilot Studio (lecture seule vs CRUD), je peux te donner la checklist “exacte” par action à créer.
