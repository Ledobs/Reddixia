<#
.SYNOPSIS
    Script de génération des INDEX complets des 19 agents Reddixia

.DESCRIPTION
    Crée un fichier INDEX.md complet pour chaque agent avec:
    - Metadata (Code, Nom, Rôle, Version, Statut)
    - Mission et responsabilités
    - Détails techniques (Rubriques, KPIs, Adaptive Cards, Rapports)
    - Références aux fichiers d'architecture

.NOTES
    Auteur  : Idexia365
    Date    : 2025-12-20
    Version : 1.2
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
$script:CreatedFiles = 0

#region Fonctions

function Write-Section {
    param([Parameter(Mandatory=$true)][string]$Title)
    Write-Host "`n$('=' * 80)" -ForegroundColor Yellow
    Write-Host $Title -ForegroundColor Yellow
    Write-Host "$('=' * 80)`n" -ForegroundColor Yellow
}

function New-AgentIndex {
    param(
        [Parameter(Mandatory=$true)][string]$Path,
        [Parameter(Mandatory=$true)][string]$Content
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
            Write-Host "✓ CRÉÉ: $fileName" -ForegroundColor Cyan
            $script:CreatedFiles++
        } else {
            Write-Host "→ CRÉERAIT: $fileName" -ForegroundColor Cyan
        }
    } else {
        Write-Host "  EXISTE: $fileName" -ForegroundColor Gray
    }
}

function Get-PropArray {
    param(
        [Parameter(Mandatory=$true)][psobject]$Agent,
        [Parameter(Mandatory=$true)][string]$PropName
    )
    if ($null -eq $Agent) { return @() }
    if ($Agent.PSObject.Properties.Match($PropName).Count -gt 0) {
        $val = $Agent.$PropName
        if ($null -eq $val) { return @() }
        if ($val -is [System.Array]) { return $val }
        return @($val)
    }
    return @()
}

#endregion

# TITRE
Write-Host "`n" -ForegroundColor Cyan
Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   REDDIXIA - Génération des INDEX agents complets            ║" -ForegroundColor Cyan
Write-Host "║   19 agents IA-TPG-001 à IA-TPG-019                          ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "Repo: $RepoPath" -ForegroundColor White
Write-Host "Mode: $(if ($DryRun) { 'DRY RUN (simulation)' } else { 'PRODUCTION' })" -ForegroundColor $(if ($DryRun) { 'Yellow' } else { 'Green' })
Write-Host "`n"

Write-Section "Génération des INDEX agents"

# Définition complète des 19 agents
$agents = @(
    @{
        Code = "IA-TPG-001"; Name = "IDEXIOS"; Path = "docs\agents\HUB\IDEXIOS"; Pack = "HUB";
        Role = "Hub / Méta-orchestrateur"; Version = "v1.03"; Status = "✅ En cours";
        Model = "GPT-5 Auto (Preview)"; Platform = "Microsoft Copilot Studio";
        Mission = "Agent orchestrateur central qui transforme les intentions stratégiques en actions coordonnées. Route les questions vers les agents spécialisés et assemble une vue intégrée du portefeuille et de la solution.";
        Responsibilities = @("Qualification d'intention (9 rubriques)","Résolution de contexte (projet/programme/portefeuille + période)","Routage vers Domain Packs appropriés","Assemblage des sorties (3 formats)","Traçabilité et observabilité");
        RubriquesDesc = @("Salutations","Portefeuille","Conseils","Scenarios","Livrables","Gouvernance","Recommencer","Merci","Au revoir");
        DataSources = @("Dataverse TPG (Portfolio, Finances, Capacity, Task, Controls, Pipeline, Resources)","SharePoint Idexios-Prime","Sources personnalisées (optionnelles)");
        Outputs = @("Conversation: Réponse structurée Copilot Studio","Power Pages: Adaptive Cards, rapports drill-down","Process: Écritures Dataverse/SharePoint")
    },

    @{
        Code = "IA-TPG-002"; Name = "HERMES-PROJ"; Path = "docs\agents\DELIVERYOPS\HERMES-PROJ"; Pack = "DeliveryOps";
        Role = "Pilotage projet / Livrables"; Version = "v0.05"; Status = "✅ En cours";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Agent de pilotage projet : synthèse état d'avancement, planning, risques et production de livrables standardisés.";
        Responsibilities = @("Suivi jalons","Synthèse statut","Génération checklists livrables","Escalade risques");
        DataSources = @("Dataverse: Tasks/Progress","SharePoint: Livrables, Templates");
        Outputs = @("Rapport statut","Checklist livraison","Tickets d'action")
    },

    @{
        Code = "IA-TPG-003"; Name = "ATHENA-PORTF"; Path = "docs\agents\PORTFOLIOOPS\ATHENA-PORTF"; Pack = "PortfolioOps";
        Role = "Analyse portefeuille"; Version = "v0.07"; Status = "✅ En cours";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Analyse portefeuille, agrégation risques et priorisation des initiatives.";
        Responsibilities = @("Consolidation KPI portefeuille","Priorisation","Scoring risques");
        DataSources = @("Dataverse: Portfolio, Resources","Reports: Financials");
        Outputs = @("Tableau priorisation","Synthèse risques")
    },

    @{
        Code = "IA-TPG-004"; Name = "THEMIS-GOV"; Path = "docs\agents\GOVERNANCEOPS\THEMIS-GOV"; Pack = "GovernanceOps";
        Role = "Gouvernance & conformité"; Version = "v0.06"; Status = "✅ En cours";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Veille conformité, qualité données et contrôles; fournit diagnostics et recommandations.";
        Responsibilities = @("Contrôles données","Rapports conformité","Guidelines");
        DataSources = @("Dataverse Controls","SharePoint policies");
        Outputs = @("Audit summary","Règles qualité")
    },

    @{
        Code = "IA-TPG-005"; Name = "ATLAS-CTRL"; Path = "docs\agents\FINANCEOPS\ATLAS-CTRL"; Pack = "FinanceOps";
        Role = "Contrôleur/analyste PCO"; Version = "v0.09"; Status = "✅ En cours";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Consolide efforts, coûts, échéanciers et risques. Détecte anomalies financières, calcule EVM et prépare rapports FinOps.";
        Responsibilities = @("Calcul EVM","Analyse variances budgétaires","Showback/Chargeback","Détection anomalies","Préparation rapports");
        KPIs = @("SPI: EV/PV","CPI: EV/AC","EAC: BAC/CPI","ETC: EAC - AC"); 
        AdaptiveCards = @("Card.FinOps.ShowbackChargeback","Card.EVM.Controls","Card.FinanceExceptionsSummary");
        Reports = @("PortfolioFinOpsShowback.xlsx","FinancialControlReport.docx","BudgetVarianceSummary.pptx")
    },

    @{
        Code = "IA-TPG-006"; Name = "IRIS-RISK"; Path = "docs\agents\PORTFOLIOOPS\IRIS-RISK"; Pack = "PortfolioOps";
        Role = "Analyse risque projet"; Version = "v0.05"; Status = "✅ En cours";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Évalue risques projets, propose mesures d'atténuation et simule impacts sur portefeuille.";
        Responsibilities = @("Scoring risque","Simulations d'impact","Recommandations");
        DataSources = @("Dataverse: Risk, Portfolio"); Outputs = @("Heatmap risque","Plan mitigation")
    },

    @{
        Code = "IA-TPG-007"; Name = "GAIA-DATA"; Path = "docs\agents\GOVERNANCEOPS\GAIA-DATA"; Pack = "GovernanceOps";
        Role = "Qualité données & catalogue"; Version = "v0.04"; Status = "✅ En cours";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Supervise qualité des référentiels, propose corrections, et gère le catalogue de données.";
        Responsibilities = @("Détection qualité","Mapping champs","Gouvernance vocabulaire");
        DataSources = @("Dataverse schema","SharePoint master data"); Outputs = @("Rapport qualité","Actions correction")
    },

    @{
        Code = "IA-TPG-008"; Name = "APOLLO-CHANGE"; Path = "docs\agents\COMMSOPS\APOLLO-CHANGE"; Pack = "CommsOps";
        Role = "Communication & adoption"; Version = "v0.03"; Status = "🟡 Approuvé";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Gère communications de changement: plans, messages et supports d'adoption.";
        Responsibilities = @("Rédaction messages","Plan de campagne","Mesure adoption");
        AdaptiveCards = @("Card.Comms.Announcement","Card.Comms.AdoptionMetrics");
        Outputs = @("Templates communications","Campagne plan")
    },

    @{
        Code = "IA-TPG-009"; Name = "JANUS-CLOSE"; Path = "docs\agents\FINANCEOPS\JANUS-CLOSE"; Pack = "FinanceOps";
        Role = "Réconciliation et accélération clôture périodique"; Version = "v0.03"; Status = "🟡 Approuvé - À implémenter";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Rapproche données financières pour accélérer clôtures et détecter écarts.";
        Responsibilities = @("Matching Dataverse↔SharePoint","Détection écarts","Proposition corrections","Création cases clôture","Traçabilité");
        AdaptiveCards = @("Card.Close.ReconciliationSummary","Card.Close.ReconciliationCases","Card.Close.ProposedCorrections");
        Reports = @("CloseReconciliationPack.docx","CloseExceptionRegister.xlsx","CloseSLADashboard.html")
    },

    @{
        Code = "IA-TPG-010"; Name = "VESTA-INVOICE"; Path = "docs\agents\FINANCEOPS\VESTA-INVOICE"; Pack = "FinanceOps";
        Role = "Traitement d'exceptions de factures"; Version = "v0.03"; Status = "🟡 Approuvé - À implémenter";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Détecte et traite exceptions de facturation et route pour approbation.";
        Responsibilities = @("Détection doublons","Validation contrat↔temps↔facture","Vérification pièces","Suivi exceptions");
        ValidationRules = @("Duplicata","Pièces manquantes","Dépassement seuils","Écarts timesheet");
        AdaptiveCards = @("Card.Invoice.Exceptions","Card.Invoice.Evidence","Card.Invoice.ApprovalRoute");
        Reports = @("InvoiceExceptionPack.docx","InvoiceExceptionLog.xlsx","InvoiceApprovalQueue.csv")
    },

    @{
        Code = "IA-TPG-011"; Name = "PLUTUS-ANOM"; Path = "docs\agents\FINANCEOPS\PLUTUS-ANOM"; Pack = "FinanceOps";
        Role = "Détection d'anomalies et conformité dépenses"; Version = "v0.03"; Status = "🟡 Approuvé - À implémenter";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Surveille transactions, applique patterns, score et crée cas d'investigation.";
        Responsibilities = @("Surveillance transactions","Application règles d'anomalie","Scoring risque","Documentation preuves","Création cases");
        AnomalyPatterns = @("Hausse MoM > 20%","Dépense hors heures ouvrables","Centre de coûts inconnu","Tag manquant","Seuil politique dépassé");
        AdaptiveCards = @("Card.SpendAnomaly.TopFindings","Card.SpendAnomaly.Cases","Card.SpendAnomaly.PolicyLinks");
        Reports = @("SpendAnomalyReport.docx","SpendAnomalyLog.xlsx","SpendAnomalyTrend.html")
    },

    @{
        Code = "IA-TPG-012"; Name = "CASSANDRA-FQA"; Path = "docs\agents\FINANCEOPS\CASSANDRA-FQA"; Pack = "FinanceOps";
        Role = "Finance Q&A (Front-line)"; Version = "v0.03"; Status = "🟡 Approuvé - À implémenter";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Répond aux questions financières basées sur Dataverse/SharePoint et fournit traçabilité.";
        Responsibilities = @("Réponse ad-hoc","Citation sources","Escalade vers spécialiste","Journalisation Q&R");
        AdaptiveCards = @("Card.FinanceAnswer","Card.AnswerTrace","Card.RouteToSpecialist")
        Reports = @("FinanceQATranscript.md")
    },

    @{
        Code = "IA-TPG-013"; Name = "MERCURY-COLLECT"; Path = "docs\agents\FINANCEOPS\MERCURY-COLLECT"; Pack = "FinanceOps";
        Role = "Recouvrement & priorisation AR"; Version = "v0.03"; Status = "🟠 Optionnel";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Priorise comptes à risque, rédige communications et suit promesses de paiement.";
        Responsibilities = @("Priorisation comptes","Rédaction communications","Suivi promesses","Escalade");
        AdaptiveCards = @("Card.Collections.Priorities","Card.Collections.CommsDraft","Card.Collections.PromiseToPay");
        Reports = @("CollectionsWorklist.xlsx","CollectionsWeeklySummary.docx")
    },

    @{
        Code = "IA-TPG-014"; Name = "MINERVA-DATA"; Path = "docs\agents\GOVERNANCEOPS\MINERVA-DATA"; Pack = "GovernanceOps";
        Role = "Data steward / Quality"; Version = "v0.03"; Status = "✅ En cours";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Support data steward, corrige anomalies et publie dictionnaire données.";
        Responsibilities = @("Maintenance catalogue","Corrections qualité","Support gouvernance");
        Outputs = @("Dictionnaire données","Rapports qualité")
    },

    @{
        Code = "IA-TPG-015"; Name = "CICERO-ALLHANDS"; Path = "docs\agents\COMMSOPS\CICERO-ALLHANDS"; Pack = "CommsOps";
        Role = "Communication évènementielle & all-hands"; Version = "v0.02"; Status = "✅ En cours";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Prépare supports pour réunions all-hands: agendas, synthèses et FAQ.";
        Responsibilities = @("Génération agenda","Synthèse réunions","FAQ dynamique");
        Outputs = @("Agenda","Synthèse","FAQ")
    },

    @{
        Code = "IA-TPG-016"; Name = "POSEIDON-CASH"; Path = "docs\agents\FINANCEOPS\POSEIDON-CASH"; Pack = "FinanceOps";
        Role = "Analyse variances cashflow"; Version = "v0.03"; Status = "🟡 Approuvé - À implémenter";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Analyse variances cashflow, saisonnalité et prépare packs comité.";
        Responsibilities = @("Analyse variances cashflow","Tendances rolling 6-12 mois","Préparation pack comité");
        AdaptiveCards = @("Card.Cashflow.Trends");
        Reports = @("CashflowVarianceReport.xlsx","CashflowTrend.html")
    },

    @{
        Code = "IA-TPG-017"; Name = "JUNO-CONTRACT"; Path = "docs\agents\PROCUREMENTOPS\JUNO-CONTRACT"; Pack = "ProcurementOps";
        Role = "Contrats & RFP assistant"; Version = "v0.03"; Status = "✅ En cours";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Assiste sur création/validation contrats, matching clauses et suivi RFP.";
        Responsibilities = @("Génération clauses","Validation conformité","Suivi RFP");
        Outputs = @("Draft contrat","Checklist compliance")
    },

    @{
        Code = "IA-TPG-018"; Name = "CERES-BUDGET"; Path = "docs\agents\FINANCEOPS\CERES-BUDGET"; Pack = "FinanceOps";
        Role = "Budgeting & forecasting"; Version = "v0.03"; Status = "✅ En cours";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Support budget: consolidation, forecast, scénarios what-if.";
        Responsibilities = @("Consolidation budget","Forecasting","Scénarios what-if");
        Outputs = @("Budget pack","Forecast summary")
    },

    @{
        Code = "IA-TPG-019"; Name = "VULCAN-PROC"; Path = "docs\agents\PROCUREMENTOPS\VULCAN-PROC"; Pack = "ProcurementOps";
        Role = "Procurement ops & sourcing"; Version = "v0.02"; Status = "✅ En cours";
        Model = "GPT-4 Turbo"; Platform = "Microsoft Copilot Studio";
        Mission = "Support opérations procurement, sourcing et suivi fournisseur.";
        Responsibilities = @("Sourcing","Suivi contrats","Reporting procurement");
        Outputs = @("Sourcing briefs","Procurement dashboard")
    }
)

# Génération des INDEX pour chaque agent
foreach ($agent in $agents) {
    # Récupérations sûres des propriétés optionnelles
    $responsibilities = Get-PropArray -Agent $agent -PropName 'Responsibilities'
    $rubriquesDesc    = Get-PropArray -Agent $agent -PropName 'RubriquesDesc'
    $dataSources      = Get-PropArray -Agent $agent -PropName 'DataSources'
    $outputs          = Get-PropArray -Agent $agent -PropName 'Outputs'
    $kpis             = Get-PropArray -Agent $agent -PropName 'KPIs'
    $adaptiveCards    = Get-PropArray -Agent $agent -PropName 'AdaptiveCards'
    $reports          = Get-PropArray -Agent $agent -PropName 'Reports'
    $validationRules  = Get-PropArray -Agent $agent -PropName 'ValidationRules'
    $anomalyPatterns  = Get-PropArray -Agent $agent -PropName 'AnomalyPatterns'

    $respText = if ((@($responsibilities)).Count -gt 0) { ($responsibilities | ForEach-Object { "- $_" } | Out-String) } else { "- (Aucune responsabilité décrite)`n" }
    $rubriquesText = if ((@($rubriquesDesc)).Count -gt 0) { ($rubriquesDesc | ForEach-Object { "- $_" } | Out-String) } else { "- (Aucune rubrique listée)`n" }
    $dataSourcesText = if ((@($dataSources)).Count -gt 0) { ($dataSources | ForEach-Object { "- $_" } | Out-String) } else { "- (Aucune source renseignée)`n" }
    $outputsText = if ((@($outputs)).Count -gt 0) { ($outputs | ForEach-Object { "- $_" } | Out-String) } else { "- (Aucune sortie listée)`n" }
    $kpisText = if ((@($kpis)).Count -gt 0) { ($kpis | ForEach-Object { "- $_" } | Out-String) } else { "" }
    $adaptiveCardsText = if ((@($adaptiveCards)).Count -gt 0) { ($adaptiveCards | ForEach-Object { "- $_" } | Out-String) } else { "" }
    $reportsText = if ((@($reports)).Count -gt 0) { ($reports | ForEach-Object { "- $_" } | Out-String) } else { "" }
    $validationRulesText = if ((@($validationRules)).Count -gt 0) { ($validationRules | ForEach-Object { "- $_" } | Out-String) } else { "" }
    $anomalyPatternsText = if ((@($anomalyPatterns)).Count -gt 0) { ($anomalyPatterns | ForEach-Object { "- $_" } | Out-String) } else { "" }

    $indexContent = @"
# Registre Agent Reddixia - $($agent.Code)

**Auteur**: Idexia365  
**Date**: $(Get-Date -Format "yyyy-MM-dd")  
**Version**: 11.0  
**Projet**: Reddixia - Toolbox agentique xPM-Pantheon

---

## Metadata

| Propriété | Valeur |
|-----------|--------|
| **Code** | $($agent.Code) |
| **Nom** | $($agent.Name) |
| **Rôle** | $($agent.Role) |
| **Version** | $($agent.Version) |
| **Statut** | $($agent.Status) |
| **Domain Pack** | $($agent.Pack) |
| **Modèle** | $($agent.Model) |
| **Plateforme** | $($agent.Platform) |

---

## Mission

$($agent.Mission)

---

## Responsabilités

$respText
---

## Intégrations

### Rubriques Idexios
$rubriquesText
---

## Spécifications Techniques

### Sources de données
$dataSourcesText
---

### Sorties
$outputsText
---

### KPIs
$kpisText
---

### Adaptive Cards
$adaptiveCardsText
---

### Rapports
$reportsText
---

### Règles / Patterns
$validationRulesText
$anomalyPatternsText
---

## Références

- `$($agent.Path)/$(($agent.Name).ToLower())-index.md`
- `$($agent.Path)/archi_$($agent.Code)_$($agent.Name).html`

---

**Mis à jour**: $(Get-Date -Format "yyyy-MM-dd")  
**Maintenu par**: Idexia365
"@

    $indexPath = Join-Path $RepoPath "$($agent.Path)\INDEX.md"
    New-AgentIndex -Path $indexPath -Content $indexContent
}

Write-Host "`n✓ INDEX agents créés: $script:CreatedFiles fichiers" -ForegroundColor Green

Write-Section "RÉSUMÉ"
Write-Host "✓ Agents traités: $($agents.Count)" -ForegroundColor Green
Write-Host "✓ Fichiers créés: $script:CreatedFiles" -ForegroundColor Green

if ($DryRun) {
    Write-Host "`n⚠️  MODE SIMULATION - Aucune modification réelle effectuée" -ForegroundColor Yellow
    Write-Host "Relancez sans -DryRun pour appliquer les changements`n" -ForegroundColor Yellow
} else {
    Write-Host "`n✅ MODIFICATIONS APPLIQUÉES AVEC SUCCÈS!" -ForegroundColor Green
    Write-Host "Prochaine étape: git add . && git commit && git push`n" -ForegroundColor Cyan
}