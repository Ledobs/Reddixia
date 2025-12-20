# Checklist — cohérence & qualité d’architecture (Idexios / Reddixia)

Checklist utilisable en revue (PR), atelier, ou préparation de livrables.  
But: éviter les incohérences entre vues, réduire les “angles morts” (données, sécurité, opérations).

---

## 1) Hygiène de base (document / repo)
- [ ] Le livrable a un **titre**, une **version**, une **date** et un **owner**.
- [ ] Les termes sont cohérents (glossaire ou vocabulaire stable).
- [ ] Les décisions majeures sont tracées (ADR / décisions).
- [ ] Les acronymes sont explicités au moins une fois.

---

## 2) Cohérence des vues (cross‑view)
- [ ] Les mêmes composants portent le même nom dans toutes les vues.
- [ ] Les relations ne se contredisent pas (ex. “A dépend de B” vs l’inverse).
- [ ] Les frontières/périmètres sont identiques (tenant, client, zone MCP, etc.).
- [ ] La granularité est assumée (si une vue est “haut niveau”, elle n’entre pas dans le détail inutile).

---

## 3) Modélisation “agents” (spécification)
- [ ] Chaque agent a: code (IA‑TPG‑xxx), nom_code, Domain Pack, statut.
- [ ] Mission et limites (hors‑périmètre) documentées.
- [ ] Inputs/outputs définis (contrat de sortie stable si card/report).
- [ ] Rubriques/intent de routage explicites (quand et pourquoi l’agent répond).
- [ ] Gestion du contexte (`ctx`) décrite (création, mise à jour, multi‑sélection).

---

## 4) Données & métriques
- [ ] Sources identifiées (Dataverse, SharePoint, autres).
- [ ] Champs clés explicités (IDs, périodes, statuts, montants).
- [ ] Règles de qualité des données (valeurs manquantes, normalisation).
- [ ] KPI: définition + formule + source de vérité + périodicité.
- [ ] Les unités sont claires (heures vs jours, $ vs €, périodes, etc.).

---

## 5) Sécurité & conformité
- [ ] Principe de moindre privilège appliqué (qui voit quoi, où, comment).
- [ ] Contrôles: rôles Dataverse/RLS, groupes M365, DLP, étiquettes, rétention (si applicable).
- [ ] Données sensibles identifiées et traitées (masquage, accès, audit).
- [ ] Journalisation: quoi, où, durée, accès aux logs.
- [ ] Scénarios “permissions insuffisantes” prévus (message utile + fallback).

---

## 6) Intégrations & dépendances
- [ ] Dépendances listées (services, API, autres agents).
- [ ] Types de liens documentés: reads/writes/uses/publishes/controls.
- [ ] Gestion d’erreur par dépendance (timeout, retry, circuit‑breaker si pertinent).
- [ ] Contrat d’interface (inputs/outputs) versionné.

---

## 7) Exploitation (UNIT/ACCEP/PROD)
- [ ] Parcours de déploiement décrit (UNIT → ACCEP → PROD).
- [ ] Variables/Secrets gérés (pas en clair dans le repo).
- [ ] Monitoring/alertes définis (minimum: erreurs, latence, volumes).
- [ ] Plan de rollback ou stratégie de retour arrière.
- [ ] Procédures de support (qui fait quoi, comment diagnostiquer).

---

## 8) Diagrammes (Cytoscape / autres)
- [ ] IDs stables et uniques (nodes/edges).
- [ ] Classes utilisées pour style (pas d’exception non justifiée).
- [ ] Layout déclaré (dagre/cose/breadthfirst) et cohérent avec l’objectif.
- [ ] Les edges ont un `rel` (verbe) et, si utile, un label.
- [ ] Les groupements (packs/boundaries) sont utilisés pour limiter la densité.

---

## 9) Tests & acceptation
- [ ] Scénarios minimaux listés (happy path + cas d’exception).
- [ ] Données d’essai prévues (ou stratégie d’anonymisation).
- [ ] Critères d’acceptation clairs (qualité, stabilité, temps de réponse si mesuré).
- [ ] Reproductibilité: comment rejouer un scénario.

---

## 10) “Dernier regard” (avant publication)
- [ ] Une personne externe à l’auteur comprend le livrable en 10 minutes.
- [ ] Les risques majeurs sont visibles (et pas cachés dans les annexes).
- [ ] Les prochaines étapes sont nettes (backlog court, priorisé).
- [ ] La version publiée est déposée dans Idexios‑Prime avec métadonnées.

---

## Annexe — Score rapide (optionnel)

Attribuer un score 0/1 par section (1 à 10) pour une lecture “go/no‑go”.
- 8–10: solide
- 6–7: acceptable avec actions
- ≤5: à reprendre avant diffusion
