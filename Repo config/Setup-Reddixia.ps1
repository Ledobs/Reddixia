<#
.SYNOPSIS
    Script de mise à jour structure Reddixia (aligné v11)

.DESCRIPTION
    Implémente le plan de mise à jour complet v11 avec structure détaillée:
    1. Structure de répertoires (agents par domain packs, ADR, etc.)
    2. README par section majeure
    3. INDEX légers pour sections mineures
    4. Fichiers référence (minimum viable)

.NOTES
    Auteur  : Idexia365
    Date    : 2025-12-20
    Version : 11.3
    Projet  : Reddixia - Toolbox agentique xPM-Pantheon
#>

#Requires -Version 5.1

[CmdletBinding()]
param(
    [Parameter(Position=0)]
    [string]$RepoPath = (Get-Location).Path,
    
    [Parameter()]
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

# Variables de comptage
$script:CreatedDirs = 0
$script:CreatedFiles = 0

#region Fonctions

function Write-Section {
    param([Parameter(Mandatory=$true)][string]$Title)
    Write-Host "`n$('=' * 80)" -ForegroundColor Yellow
    Write-Host $Title -ForegroundColor Yellow
    Write-Host "$('=' * 80)`n" -ForegroundColor Yellow
}

function New-Directory {
    param([Parameter(Mandatory=$true)][string]$Path)
    if (-not (Test-Path -Path $Path)) {
        if (-not $DryRun) {
            New-Item -ItemType Directory -Force -Path $Path | Out-Null
            Write-Host "✓ CRÉÉ: $Path" -ForegroundColor Green
            $script:CreatedDirs++
        } else {
            Write-Host "→ CRÉERAIT: $Path" -ForegroundColor Cyan
        }
    } else {
        Write-Host "  EXISTE: $Path" -ForegroundColor Gray
    }
}

function New-DocumentFile {
    param(
        [Parameter(Mandatory=$true)][string]$Path,
        [Parameter(Mandatory=$true)][string]$Content,
        [Parameter()][string]$Type = "MD"
    )
    
    $parentPath = Split-Path -Path $Path -Parent
    if (-not (Test-Path -Path $parentPath)) {
        if (-not $DryRun) {
            New-Item -ItemType Directory -Force -Path $parentPath | Out-Null
        }
    }
    
    $fileName = Split-Path $Path -Leaf
    if (-not (Test-Path -Path $Path)) {
        if (-not $DryRun) {
            [System.IO.File]::WriteAllText($Path, $Content, [System.Text.Encoding]::UTF8)
            Write-Host "✓ CRÉÉ: $fileName [$Type]" -ForegroundColor Cyan
            $script:CreatedFiles++
        } else {
            Write-Host "→ CRÉERAIT: $fileName [$Type]" -ForegroundColor Cyan
        }
    } else {
        Write-Host "  EXISTE: $fileName" -ForegroundColor Gray
    }
}

#endregion

# TITRE
Write-Host "`n" -ForegroundColor Cyan
Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   REDDIXIA - Mise à jour Structure v11 COMPLÈTE              ║" -ForegroundColor Cyan
Write-Host "║   Architecture détaillée avec agents par domain packs        ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "Repo: $RepoPath" -ForegroundColor White
Write-Host "Mode: $(if ($DryRun) { 'DRY RUN (simulation)' } else { 'PRODUCTION' })" -ForegroundColor $(if ($DryRun) { 'Yellow' } else { 'Green' })
Write-Host "`n"

# ÉTAPE 1: Structure de répertoires
Write-Section "ÉTAPE 1/4: Structure hiérarchique complète"

$directories = @(
    # Architecture
    "docs\architecture",
    "docs\architecture\adr",
    
    # Agents - Hub
    "docs\agents\HUB\IDEXIOS",
    
    # Agents - FinanceOps (8 agents)
    "docs\agents\FINANCEOPS\ATLAS-CTRL",
    "docs\agents\FINANCEOPS\JANUS-CLOSE",
    "docs\agents\FINANCEOPS\VESTA-INVOICE",
    "docs\agents\FINANCEOPS\PLUTUS-ANOM",
    "docs\agents\FINANCEOPS\CASSANDRA-FQA",
    "docs\agents\FINANCEOPS\MERCURY-COLLECT",
    "docs\agents\FINANCEOPS\POSEIDON-CASH",
    "docs\agents\FINANCEOPS\CERES-BUDGET",
    
    # Agents - PortfolioOps (2 agents)
    "docs\agents\PORTFOLIOOPS\ATHENA-PORTF",
    "docs\agents\PORTFOLIOOPS\IRIS-RISK",
    
    # Agents - GovernanceOps (3 agents)
    "docs\agents\GOVERNANCEOPS\THEMIS-GOV",
    "docs\agents\GOVERNANCEOPS\GAIA-DATA",
    "docs\agents\GOVERNANCEOPS\MINERVA-DATA",
    
    # Agents - DeliveryOps (1 agent)
    "docs\agents\DELIVERYOPS\HERMES-PROJ",
    
    # Agents - ProcurementOps (2 agents)
    "docs\agents\PROCUREMENTOPS\JUNO-CONTRACT",
    "docs\agents\PROCUREMENTOPS\VULCAN-PROC",
    
    # Agents - CommsOps (2 agents)
    "docs\agents\COMMSOPS\APOLLO-CHANGE",
    "docs\agents\COMMSOPS\CICERO-ALLHANDS",
    
    # Agents - Backlog
    "docs\agents\backlog",
    
    # Autres sections
    "docs\data",
    "docs\rubriques",
    "docs\ui",
    "docs\finance",
    "docs\templates",
    "docs\tech",
    "docs\governance",
    "docs\roadmap"
)

foreach ($dir in $directories) {
    $fullPath = Join-Path $RepoPath $dir
    New-Directory -Path $fullPath
}

Write-Host "`n✓ Structure créée: $($directories.Count) répertoires" -ForegroundColor Green

# ÉTAPE 2: README pour sections majeures
Write-Section "ÉTAPE 2/4: README sections majeures"

$archReadme = @"
# Architecture et décisions d'architecture (ADR)

## Description
Documentation des vues d'ensemble, principes architecturaux, comptes-rendus de sessions et catalogue des architectures HTML par agent.

## Navigation
- [index.md](index.md) - Navigation vers HTML v11, principes
- [Idexios Toolbox Overview](idexios-toolbox-overview.md) - Pipeline requête→rubriques→packs→sorties
- [État architecture](etat-architecture.md) - État vs backlog
- [Compte-rendu v11](compte-rendu-session-v11.md) - CR session
- [Changelog](changelog-architecture.md) - Historique v3→v11
- [Menu architectures](menu-architectures.md) - Navigation multi-architectures
- [Catalogue architectures](catalogue-architectures.md) - Registre: Agent→URL→version
- [ADR](adr/) - Architecture Decision Records

---
**Projet**: Reddixia - Toolbox agentique xPM-Pantheon  
**Mise à jour**: $(Get-Date -Format "yyyy-MM-dd")  
**Maintenu par**: Idexia365
"@

$agentsReadme = @"
# Documentation des agents IA (IA-TPG-001 à IA-TPG-019)

## Vue d'ensemble
Registre complet des 19 agents organisés en 6 domain packs fonctionnels.

## Domain Packs
- [FinanceOps](FINANCEOPS/) - 8 agents (ATLAS, JANUS, VESTA, PLUTUS, CASSANDRA, MERCURY, POSEIDON, CERES)
- [PortfolioOps](PORTFOLIOOPS/) - 2 agents (ATHENA, IRIS)
- [GovernanceOps](GOVERNANCEOPS/) - 3 agents (THEMIS, GAIA, MINERVA)
- [DeliveryOps](DELIVERYOPS/) - 1 agent (HERMES)
- [ProcurementOps](PROCUREMENTOPS/) - 2 agents (JUNO, VULCAN)
- [CommsOps](COMMSOPS/) - 2 agents (APOLLO, CICERO)
- [Hub Orchestration](HUB/) - 1 agent (IDEXIOS)

## Fichiers clés
- [agents-registry.md](agents-registry.md) - Registre existant
- [agents-registry-v2.md](agents-registry-v2.md) - Registre complet IA-TPG-001→019
- [inventaire-agents.md](inventaire-agents.md) - Versions v0.03/v0.09/v1.03
- [domain-packs-architecture.md](domain-packs-architecture.md) - 6 domain packs
- [flux-agentique-par-pack.md](flux-agentique-par-pack.md) - Flux standards
- [contrat-agentique.md](contrat-agentique.md) - Clés transversales

---
**Projet**: Reddixia  
**Mise à jour**: $(Get-Date -Format "yyyy-MM-dd")
"@

$dataReadme = @"
# Modèle de données et mappings Dataverse/SharePoint

## Description
Schéma TPG/PPPS Dataverse, mappings de champs, structure SharePoint Idexios-Prime.

## Fichiers
- [modele-de-donnees-tpg.md](modele-de-donnees-tpg.md) - Schéma TPG/PPPS
- [mapping-dataverse-champs.md](mapping-dataverse-champs.md) - Mapping tables/champs
- [sharepoint-idexios-prime-structure.md](sharepoint-idexios-prime-structure.md) - Structure Idexios-Prime
- [finops-evm-kpis.md](finops-evm-kpis.md) - KPIs EVM/FinOps
- [schema-cles-transversales.md](schema-cles-transversales.md) - Clés contextuelles

## Références
- [Schéma dbdiagram](https://dbdiagram.io/d/TPG_PPPandS_DEC2025-69459a734bbde0fd74d8852f)
- [SharePoint Idexios-Prime](https://idexia365.sharepoint.com/sites/Idexios/Prime)

---
**Projet**: Reddixia  
**Mise à jour**: $(Get-Date -Format "yyyy-MM-dd")
"@

$templatesReadme = @"
# Gabarits réutilisables et prompts standards

## Description
Templates SharePoint, gabarits architecture agents, prompts Cytoscape, checklists qualité.

## Fichiers
- [sharepoint-templates.md](sharepoint-templates.md) - Catalogue gabarits Idexios-Prime
- [gabarit-devis-architecture-agent.md](gabarit-devis-architecture-agent.md) - Structure standard agents
- [gabarit-diagrammes-cytoscape.md](gabarit-diagrammes-cytoscape.md) - Conventions graphiques
- [prompt-generation-graphes.md](prompt-generation-graphes.md) - Prompts Cytoscape
- [checklist-coherence-architecture.md](checklist-coherence-architecture.md) - Checklist qualité

---
**Projet**: Reddixia  
**Mise à jour**: $(Get-Date -Format "yyyy-MM-dd")
"@

New-DocumentFile -Path (Join-Path $RepoPath "docs\architecture\README.md") -Content $archReadme -Type "README"
New-DocumentFile -Path (Join-Path $RepoPath "docs\agents\README.md") -Content $agentsReadme -Type "README"
New-DocumentFile -Path (Join-Path $RepoPath "docs\data\README.md") -Content $dataReadme -Type "README"
New-DocumentFile -Path (Join-Path $RepoPath "docs\templates\README.md") -Content $templatesReadme -Type "README"

Write-Host "`n✓ README majeurs créés: 4 fichiers" -ForegroundColor Green

# ÉTAPE 3: README par Domain Pack
Write-Section "ÉTAPE 3/4: README Domain Packs"

$domainPacks = @{
    "docs\agents\FINANCEOPS" = "Finance Operations (8 agents)"
    "docs\agents\PORTFOLIOOPS" = "Portfolio Operations (2 agents)"
    "docs\agents\GOVERNANCEOPS" = "Governance Operations (3 agents)"
    "docs\agents\DELIVERYOPS" = "Delivery Operations (1 agent)"
    "docs\agents\PROCUREMENTOPS" = "Procurement Operations (2 agents)"
    "docs\agents\COMMSOPS" = "Communications Operations (2 agents)"
    "docs\agents\HUB" = "Hub Orchestration"
}

foreach ($pack in $domainPacks.Keys) {
    $desc = $domainPacks[$pack]
    $packReadme = @"
# $desc

Vue d'ensemble des agents du domain pack.

## Agents
Voir fichiers détaillés de chaque agent dans ce répertoire.

---
[← Retour aux agents](../README.md)
"@
    $readmePath = Join-Path $RepoPath "$pack\README.md"
    New-DocumentFile -Path $readmePath -Content $packReadme -Type "README"
}

Write-Host "`n✓ README domain packs créés: $($domainPacks.Count) fichiers" -ForegroundColor Green

# ÉTAPE 4: INDEX légers pour sections mineures
Write-Section "ÉTAPE 4/4: INDEX légers et fichiers de structure"

$indexes = @(
    @{ Path = "docs\architecture\adr"; Desc = "Architecture Decision Records" }
    @{ Path = "docs\rubriques"; Desc = "Spécifications des rubriques Idexios" }
    @{ Path = "docs\ui"; Desc = "Contrats d'interface utilisateur" }
    @{ Path = "docs\finance"; Desc = "Méthodologies financières (TBM/VMO/LPM)" }
    @{ Path = "docs\tech"; Desc = "Composantes techniques Copilot Studio" }
    @{ Path = "docs\governance"; Desc = "Gouvernance et qualité des données" }
    @{ Path = "docs\roadmap"; Desc = "Évolutions futures et backlog" }
)

foreach ($idx in $indexes) {
    $indexContent = @"
# $($idx.Desc)

Cette section sera complétée au fur et mesure.

---
[← Documentation principale](../README.md)
"@
    $indexPath = Join-Path $RepoPath "$($idx.Path)\INDEX.md"
    New-DocumentFile -Path $indexPath -Content $indexContent -Type "INDEX"
}

Write-Host "`n✓ INDEX légers créés: $($indexes.Count) fichiers" -ForegroundColor Green

# RÉSUMÉ
Write-Section "RÉSUMÉ DE L'EXÉCUTION"
Write-Host "✓ Répertoires créés: $script:CreatedDirs" -ForegroundColor Green
Write-Host "✓ Fichiers créés: $script:CreatedFiles" -ForegroundColor Green
Write-Host "`nTotal: $($script:CreatedDirs + $script:CreatedFiles) éléments traités" -ForegroundColor Cyan

Write-Host "`nStructure créée:" -ForegroundColor Cyan
Write-Host "  • 1 Hub (IDEXIOS)" -ForegroundColor Gray
Write-Host "  • 6 Domain Packs (19 agents total)" -ForegroundColor Gray
Write-Host "  • 7 sections documentation" -ForegroundColor Gray
Write-Host "  • 11 INDEX/README légers" -ForegroundColor Gray

if ($DryRun) {
    Write-Host "`n⚠️  MODE SIMULATION - Aucune modification réelle effectuée" -ForegroundColor Yellow
    Write-Host "Relancez sans -DryRun pour appliquer les changements`n" -ForegroundColor Yellow
} else {
    Write-Host "`n✅ MODIFICATIONS APPLIQUÉES AVEC SUCCÈS!" -ForegroundColor Green
    Write-Host "Prochaine étape: git add . && git commit && git push`n" -ForegroundColor Cyan
}