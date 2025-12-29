# DAT — MERCURY-COLLECT (IA-TPG-013)

> **Agent** : MERCURY-COLLECT  
> **Code** : IA-TPG-013 — à confirmer  
> **Identifiant** : MERCURY-COLLECT  
> **Domain Pack** : FinanceOps  
> **Statut** : Draft  
> **Dernière mise à jour** : 2025-12-29 16:56:16 EST

## Rôle
Agent de collecte : il normalise et consolide les données financières et d’efforts provenant de différentes sources (factures, temps, achats) vers les structures TPG.

## Mission
Assurer une chaîne de données propre : ingestion, normalisation, contrôles, puis publication vers les vues de suivi.

## Déclencheurs typiques
- Arrivée de nouveaux fichiers (factures) ou exports
- Fin de semaine / fin de mois : lot de consolidation
- Besoin ponctuel d’aligner des sources hétérogènes

## Données d’entrée
- Fichiers sources (SharePoint / OneDrive) — à confirmer
- Exports système (ERP / finance) — à confirmer
- Référentiels (projets, centres de coût, fournisseurs) — à confirmer
- SharePoint Idexios‑Prime : `/Idexios-Prime/Procedures/Finance/` (d’après `agents-registry.md`)

## Données de sortie
- Données consolidées prêtes pour contrôle (ATLAS) et budget (CERES)
- Journal de qualité (rejets, corrections, doublons)
- Mapping / dictionnaire de correspondance mis à jour — à confirmer

## Sources / Tables (Dataverse TPG)
- tpg_actual / tpg_cost / tpg_timesheet — à confirmer
- tpg_vendor / tpg_costcenter — à confirmer
- tpg_project

## Règles de validation et contrôles
- Déduplication (facture #, date, fournisseur)
- Devise/taxes cohérentes
- Traçabilité : conserver la référence au document source

## Lignes d’action BPMN candidates
| Ligne d’action | Déclencheur | Entrées | Traitement | Sorties |
|---|---|---|---|---|
| FIN-30 • Ingestion et normalisation | Nouveaux réels | Sources brutes | Nettoyer + mapper + valider + charger | Réels consolidés + log |

## Hypothèses et points à confirmer
- Sources exactes (SharePoint libraries, connecteurs) à confirmer
- Format des logs attendu (JSONL/Dataverse) à confirmer

## Accès / permissions (à confirmer)
- SharePoint : lecture sur sources brutes + gabarits
- Dataverse : droits de lecture/écriture selon mécanisme de chargement
