# DAT — POSEIDON-CASH (IA-TPG-016)

> **Agent** : POSEIDON-CASH  
> **Code** : IA-TPG-016 — à confirmer  
> **Identifiant** : POSEIDON-CASH  
> **Domain Pack** : FinanceOps  
> **Statut** : Draft  
> **Dernière mise à jour** : 2025-12-29 16:56:16 EST

## Rôle
Agent de trésorerie : il prépare des vues de liquidité et de flux de trésorerie liés aux engagements du portefeuille (décaissements prévus, engagements, risques).

## Mission
Aider à anticiper les besoins de trésorerie et à expliquer les variations par projet/programme.

## Déclencheurs typiques
- Préparation d’une projection de trésorerie
- Changement de calendrier d’un projet à impact financier
- Revues périodiques (mensuel)

## Données d’entrée
- Engagements et prévisions de décaissement — à confirmer
- Réels et paiements (finance) — à confirmer
- Calendrier projets (jalons) — à confirmer
- SharePoint Idexios‑Prime : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)

## Données de sortie
- Projection de flux de trésorerie (par période)
- Alertes sur pics de décaissement
- Explications (drivers) : projets, fournisseurs, jalons — à confirmer

## Sources / Tables (Dataverse TPG)
- tpg_cashflow / tpg_payment — à confirmer
- tpg_forecast / tpg_eac — à confirmer
- tpg_project, tpg_vendor — à confirmer

## Règles de validation et contrôles
- Aligner périodes (semaine/mois) et devise
- Lien explicite entre flux et objet métier (projet/fournisseur)
- Distinguer engagement vs paiement réel

## Lignes d’action BPMN candidates
| Ligne d’action | Déclencheur | Entrées | Traitement | Sorties |
|---|---|---|---|---|
| FIN-50 • Produire projection cash | Revue trésorerie | Prévisions + engagements + paiements | Consolider + projeter + expliquer | Projection + alertes |

## Hypothèses et points à confirmer
- Définition des tables cash dans TPG à confirmer
- Règles de périodisation (accrual vs cash) à confirmer

## Accès / permissions (à confirmer)
- SharePoint : lecture sur procédures finance
- Dataverse : lecture sur cash/prévisions/paiements si disponibles
