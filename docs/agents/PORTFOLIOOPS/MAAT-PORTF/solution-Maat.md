# Maat — Solution PortfolioOps (TPG/PMI)

## Objectif
Mettre en place un agent d’analyse et de sélection de portefeuille conforme aux standards PMI, connecté à TPG Project Power Pack & Scheduler, et capable de remplacer l’analyseur de portefeuille de Project Online.

## Portée fonctionnelle
- Sélection multicritère basée sur 4 axes PMI : Valeur Business, Alignement Stratégique, Risques, Conformité.
- Priorisation relative (AHP/Project Online) + normalisation des scores (échelle 1–5).
- Contraintes dures (Capex/Opex, capacité ressources critiques, projets incompressibles).
- Optimisation sous contraintes (dépendances, thèmes stratégiques, quotas Run/Change, équilibre par Direction, seuil de risque moyen).
- Scénarios what‑if (Budget -20%, Ressources +10%) avec comparaison et registre des décisions.
- Audit trail détaillé : justification d’inclusion/exclusion et trace des arbitrages.

## Sources de données (Dataverse)
### Tables principales (TPG)
- `tpg_project` : données projets (scores axes, statut, dates, coûts, dépendances, incompressible).
- `tpg_program` : regroupements et alignement stratégique.
- `tpg_resource` / `tpg_team` : capacité des ressources critiques.
- `tpg_cost` / `tpg_budget` : Capex/Opex, enveloppes par période.
- `tpg_dependency` : dépendances inter‑projets.
- `tpg_decision` : journal d’arbitrage et justification.

### Tables de paramétrage (Maat)
- `tpg_portfolio_axis` : définition des axes PMI + règles de normalisation.
- `tpg_portfolio_priority` : matrice AHP et poids dérivés.
- `tpg_portfolio_constraint` : contraintes dures et souples.
- `tpg_portfolio_quota` : quotas Run/Change, Direction, seuil risque moyen.
- `tpg_portfolio_scenario` : scénarios what‑if et hypothèses.

## Modèle de scoring
1. **Collecte des scores 1–5** pour chaque axe PMI.
2. **Calcul des poids** via matrice de comparaison AHP.
3. **Normalisation** (ex. min‑max ou z‑score par type de projet) pour comparabilité.
4. **Score global** = somme pondérée des axes normalisés.
5. **Score de risque** converti en pénalité si seuil de risque moyen dépassé.

## Optimisation & sélection
- **Étape 1 : Filtre bloquant** (incompressibles + contraintes Capex/Opex + capacité critique).
- **Étape 2 : Sélection** par score global sous contraintes.
- **Étape 3 : Ajustements** par quotas et dépendances.
- **Étape 4 : Scénarios** (modification des budgets/capacités/poids) et comparaison.

## Scénarios & livrables
- Tableau comparatif : score total, coût, capacité utilisée, risque moyen, projets inclus/exclus.
- Frontière efficiente Coût/Valeur.
- Matrice à bulles (Valeur vs Risque, taille = budget).
- Registre de décisions justifiant chaque inclusion/exclusion.

## Automatisation & orchestration
- **Power Automate** déclenche le recalcul dès validation des formulaires ou mise à jour des axes.
- Synchronisation avec **TPG Scheduler** pour dates/capacité.
- Publication des scénarios dans Dataverse + export vers Power BI.

## Gouvernance & audit
- Traçabilité complète : paramètres utilisés, versioning des scénarios, logs d’exécution.
- Justifications générées au format lisible comité (ex. « Projet exclu car saturation équipe IT malgré score stratégique élevé »).

## Livrables attendus
- Modèle de données Maat (Dataverse).
- Gabarits de scénarios et registre des décisions.
- Connecteurs Power Automate.
- Dashboards Power BI.
