<#
.SYNOPSIS
    Script d'inventaire des modifications de session

.DESCRIPTION
    Génère un rapport complet des modifications effectuées durant la session:
    - Fichiers créés
    - Fichiers modifiés
    - Fichiers supprimés
    - Statistiques détaillées
    - Export en HTML et JSON

.NOTES
    Auteur  : Idexia365
    Date    : 2025-12-20
    Version : 1.0
    Projet  : Reddixia - Toolbox agentique xPM-Pantheon

.PARAMETER OutputFormat
    Format de sortie: 'All', 'Html', 'Json', 'Markdown', 'Console'

.PARAMETER RepoPath
    Chemin vers le repository

.EXAMPLE
    .\Session-Inventory.ps1 -OutputFormat All
    .\Session-Inventory.ps1 -OutputFormat Html -RepoPath "."
#>

#Requires -Version 5.1

[CmdletBinding()]
param(
    [Parameter()]
    [ValidateSet('All', 'Html', 'Json', 'Markdown', 'Console')]
    [string]$OutputFormat = 'All',
    
    [Parameter()]
    [string]$RepoPath = (Get-Location).Path,
    
    [Parameter()]
    [string]$OutputDir = "session-reports"
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

#region Fonctions

function Write-Title {
    param([Parameter(Mandatory=$true)][string]$Title)
    Write-Host "`n" -ForegroundColor Cyan
    Write-Host "╔$('═' * 78)╗" -ForegroundColor Cyan
    Write-Host "║  $($Title.PadRight(76))  ║" -ForegroundColor Cyan
    Write-Host "╚$('═' * 78)╝" -ForegroundColor Cyan
    Write-Host "`n"
}

function Write-Section {
    param([Parameter(Mandatory=$true)][string]$Title)
    Write-Host "`n$('─' * 80)" -ForegroundColor Yellow
    Write-Host $Title -ForegroundColor Yellow
    Write-Host "$('─' * 80)`n" -ForegroundColor Yellow
}

function Get-GitStats {
    param([Parameter(Mandatory=$true)][string]$RepoPath)
    
    Push-Location $RepoPath
    try {
        $status = git status --porcelain
        $log = git log --oneline -10
        $branch = git rev-parse --abbrev-ref HEAD
        $remoteUrl = git config --get remote.origin.url
        
        $stats = @{
            Branch = $branch
            RemoteUrl = $remoteUrl
            Modified = @($status | Where-Object { $_ -match '^\s?M' })
            Added = @($status | Where-Object { $_ -match '^\s?A' })
            Deleted = @($status | Where-Object { $_ -match '^\s?D' })
            Untracked = @($status | Where-Object { $_ -match '^\?\?' })
            Staged = @($status | Where-Object { $_ -match '^[MADRC]' })
            RecentCommits = $log
        }
        return $stats
    }
    finally {
        Pop-Location
    }
}

function Get-FileInventory {
    param([Parameter(Mandatory=$true)][string]$RepoPath)
    
    Push-Location $RepoPath
    try {
        $files = git ls-files
        $inventory = @{
            Total = $files.Count
            ByExtension = @{}
            ByDirectory = @{}
            Markdown = @()
            Html = @()
            PowerShell = @()
            Csv = @()
        }
        
        foreach ($file in $files) {
            $ext = [System.IO.Path]::GetExtension($file)
            $dir = [System.IO.Path]::GetDirectoryName($file)
            
            # Comptage par extension
            if ($ext) {
                if ($inventory.ByExtension[$ext]) {
                    $inventory.ByExtension[$ext]++
                } else {
                    $inventory.ByExtension[$ext] = 1
                }
            }
            
            # Comptage par répertoire
            if ($dir) {
                if ($inventory.ByDirectory[$dir]) {
                    $inventory.ByDirectory[$dir]++
                } else {
                    $inventory.ByDirectory[$dir] = 1
                }
            }
            
            # Classification par type
            switch -Regex ($ext) {
                '\.md$' { $inventory.Markdown += $file }
                '\.html$' { $inventory.Html += $file }
                '\.ps1$' { $inventory.PowerShell += $file }
                '\.csv$' { $inventory.Csv += $file }
            }
        }
        
        return $inventory
    }
    finally {
        Pop-Location
    }
}

function Get-SessionSummary {
    param(
        [Parameter(Mandatory=$true)][hashtable]$GitStats,
        [Parameter(Mandatory=$true)][hashtable]$FileInventory
    )
    
    $summary = @{
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Branch = $GitStats.Branch
        RemoteUrl = $GitStats.RemoteUrl
        ModifiedCount = $GitStats.Modified.Count
        AddedCount = $GitStats.Added.Count
        DeletedCount = $GitStats.Deleted.Count
        UntrackedCount = $GitStats.Untracked.Count
        TotalFiles = $FileInventory.Total
        MarkdownFiles = $FileInventory.Markdown.Count
        HtmlFiles = $FileInventory.Html.Count
        PowerShellFiles = $FileInventory.PowerShell.Count
        CsvFiles = $FileInventory.Csv.Count
        TopExtensions = ($FileInventory.ByExtension.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 5)
        TopDirectories = ($FileInventory.ByDirectory.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 10)
    }
    
    return $summary
}

function Export-AsMarkdown {
    param(
        [Parameter(Mandatory=$true)][hashtable]$Summary,
        [Parameter(Mandatory=$true)][hashtable]$GitStats,
        [Parameter(Mandatory=$true)][string]$OutputPath
    )
    
    $md = @"
# Inventaire Session Reddixia

**Date**: $($Summary.Timestamp)  
**Branch**: ``$($Summary.Branch)``  
**Remote**: $($Summary.RemoteUrl)

---

## Résumé des modifications

| Métrique | Valeur |
|----------|--------|
| Fichiers modifiés | $($Summary.ModifiedCount) |
| Fichiers ajoutés | $($Summary.AddedCount) |
| Fichiers supprimés | $($Summary.DeletedCount) |
| Fichiers non trackés | $($Summary.UntrackedCount) |
| **Total fichiers** | $($Summary.TotalFiles) |

---

## Fichiers par type

| Type | Nombre |
|------|--------|
| Markdown (.md) | $($Summary.MarkdownFiles) |
| HTML (.html) | $($Summary.HtmlFiles) |
| PowerShell (.ps1) | $($Summary.PowerShellFiles) |
| CSV (.csv) | $($Summary.CsvFiles) |

---

## Top extensions utilisées

$($Summary.TopExtensions | ForEach-Object { "- **$($_.Name)**: $($_.Value) fichiers`n" } | Out-String)

---

## Top répertoires

$($Summary.TopDirectories | ForEach-Object { "- **$($_.Name)**: $($_.Value) fichiers`n" } | Out-String)

---

## Changements en attente

### Modifiés
$(if ($GitStats.Modified.Count -gt 0) { 
    $GitStats.Modified | ForEach-Object { "- $_`n" } | Out-String
} else {
    "- Aucun fichier modifié`n"
})

### Ajoutés
$(if ($GitStats.Added.Count -gt 0) {
    $GitStats.Added | ForEach-Object { "- $_`n" } | Out-String
} else {
    "- Aucun fichier ajouté`n"
})

### Supprimés
$(if ($GitStats.Deleted.Count -gt 0) {
    $GitStats.Deleted | ForEach-Object { "- $_`n" } | Out-String
} else {
    "- Aucun fichier supprimé`n"
})

### Non trackés
$(if ($GitStats.Untracked.Count -gt 0) {
    $GitStats.Untracked | Select-Object -First 20 | ForEach-Object { "- $_`n" } | Out-String
} else {
    "- Aucun fichier non tracké`n"
})

---

## Commits récents

$(
    $GitStats.RecentCommits | ForEach-Object { "- $_`n" } | Out-String
)

---

**Généré par**: Session-Inventory.ps1 v1.0  
**Projet**: Reddixia - Toolbox agentique xPM-Pantheon
"@
    
    [System.IO.File]::WriteAllText($OutputPath, $md, [System.Text.Encoding]::UTF8)
}

function Export-AsJson {
    param(
        [Parameter(Mandatory=$true)][hashtable]$Summary,
        [Parameter(Mandatory=$true)][hashtable]$GitStats,
        [Parameter(Mandatory=$true)][string]$OutputPath
    )
    
    $json = @{
        Timestamp = $Summary.Timestamp
        Repository = @{
            Branch = $Summary.Branch
            RemoteUrl = $Summary.RemoteUrl
        }
        Statistics = @{
            Modified = $Summary.ModifiedCount
            Added = $Summary.AddedCount
            Deleted = $Summary.DeletedCount
            Untracked = $Summary.UntrackedCount
            TotalFiles = $Summary.TotalFiles
        }
        FileTypes = @{
            Markdown = $Summary.MarkdownFiles
            Html = $Summary.HtmlFiles
            PowerShell = $Summary.PowerShellFiles
            Csv = $Summary.CsvFiles
        }
        Changes = @{
            Modified = @($GitStats.Modified)
            Added = @($GitStats.Added)
            Deleted = @($GitStats.Deleted)
            Untracked = @($GitStats.Untracked)
        }
    } | ConvertTo-Json -Depth 10
    
    [System.IO.File]::WriteAllText($OutputPath, $json, [System.Text.Encoding]::UTF8)
}

function Export-AsHtml {
    param(
        [Parameter(Mandatory=$true)][hashtable]$Summary,
        [Parameter(Mandatory=$true)][hashtable]$GitStats,
        [Parameter(Mandatory=$true)][string]$OutputPath
    )
    
    $html = @"
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventaire Session Reddixia</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        h1 { color: #2c3e50; margin-bottom: 10px; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; margin-top: 30px; margin-bottom: 15px; border-left: 4px solid #3498db; padding-left: 10px; }
        .header-info { background: #ecf0f1; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .header-info p { margin: 8px 0; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .stat-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .stat-card.added { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); }
        .stat-card.modified { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        .stat-card.deleted { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
        .stat-value { font-size: 32px; font-weight: bold; }
        .stat-label { font-size: 14px; opacity: 0.9; margin-top: 8px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        table th { background: #3498db; color: white; padding: 12px; text-align: left; }
        table td { padding: 10px 12px; border-bottom: 1px solid #ecf0f1; }
        table tr:hover { background: #f8f9fa; }
        .file-list { background: #f8f9fa; padding: 15px; border-radius: 5px; max-height: 400px; overflow-y: auto; }
        .file-item { padding: 8px; border-left: 3px solid #3498db; margin-bottom: 5px; font-family: monospace; font-size: 12px; }
        .file-item.added { border-left-color: #27ae60; color: #27ae60; }
        .file-item.modified { border-left-color: #e74c3c; color: #e74c3c; }
        .file-item.deleted { border-left-color: #c0392b; color: #c0392b; }
        .footer { margin-top: 40px; text-align: center; color: #7f8c8d; font-size: 12px; border-top: 1px solid #ecf0f1; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📋 Inventaire Session Reddixia</h1>
        
        <div class="header-info">
            <p><strong>Date:</strong> $($Summary.Timestamp)</p>
            <p><strong>Branch:</strong> <code>$($Summary.Branch)</code></p>
            <p><strong>Remote:</strong> $($Summary.RemoteUrl)</p>
        </div>

        <h2>📊 Résumé des modifications</h2>
        <div class="stats-grid">
            <div class="stat-card added">
                <div class="stat-value">$($Summary.AddedCount)</div>
                <div class="stat-label">Ajoutés</div>
            </div>
            <div class="stat-card modified">
                <div class="stat-value">$($Summary.ModifiedCount)</div>
                <div class="stat-label">Modifiés</div>
            </div>
            <div class="stat-card deleted">
                <div class="stat-value">$($Summary.DeletedCount)</div>
                <div class="stat-label">Supprimés</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">$($Summary.TotalFiles)</div>
                <div class="stat-label">Total fichiers</div>
            </div>
        </div>

        <h2>📁 Fichiers par type</h2>
        <table>
            <thead>
                <tr><th>Type</th><th>Nombre</th></tr>
            </thead>
            <tbody>
                <tr><td>Markdown (.md)</td><td>$($Summary.MarkdownFiles)</td></tr>
                <tr><td>HTML (.html)</td><td>$($Summary.HtmlFiles)</td></tr>
                <tr><td>PowerShell (.ps1)</td><td>$($Summary.PowerShellFiles)</td></tr>
                <tr><td>CSV (.csv)</td><td>$($Summary.CsvFiles)</td></tr>
            </tbody>
        </table>

        <h2>🔄 Changements en attente</h2>
        
        $(if ($GitStats.Added.Count -gt 0) {
            '<h3 style="color: #27ae60; margin-top: 20px;">✓ Fichiers ajoutés</h3>'
            '<div class="file-list">'
            foreach ($file in $GitStats.Added) {
                '<div class="file-item added">+ ' + $file + '</div>'
            }
            '</div>'
        })

        $(if ($GitStats.Modified.Count -gt 0) {
            '<h3 style="color: #e74c3c; margin-top: 20px;">⚠ Fichiers modifiés</h3>'
            '<div class="file-list">'
            foreach ($file in $GitStats.Modified) {
                '<div class="file-item modified">~ ' + $file + '</div>'
            }
            '</div>'
        })

        $(if ($GitStats.Deleted.Count -gt 0) {
            '<h3 style="color: #c0392b; margin-top: 20px;">✗ Fichiers supprimés</h3>'
            '<div class="file-list">'
            foreach ($file in $GitStats.Deleted) {
                '<div class="file-item deleted">- ' + $file + '</div>'
            }
            '</div>'
        })

        <div class="footer">
            <p>Généré par Session-Inventory.ps1 v1.0 | Projet Reddixia - Toolbox agentique xPM-Pantheon</p>
            <p>$(Get-Date -Format "yyyy-MM-dd HH:mm:ss")</p>
        </div>
    </div>
</body>
</html>
"@
    
    [System.IO.File]::WriteAllText($OutputPath, $html, [System.Text.Encoding]::UTF8)
}

function Export-ToConsole {
    param(
        [Parameter(Mandatory=$true)][hashtable]$Summary,
        [Parameter(Mandatory=$true)][hashtable]$GitStats
    )
    
    Write-Section "📊 RÉSUMÉ DES MODIFICATIONS"
    
    Write-Host "Date      : $($Summary.Timestamp)" -ForegroundColor Cyan
    Write-Host "Branch    : $($Summary.Branch)" -ForegroundColor Cyan
    Write-Host "Remote    : $($Summary.RemoteUrl)" -ForegroundColor Cyan
    
    Write-Section "📈 STATISTIQUES"
    
    Write-Host "Fichiers modifiés    : " -NoNewline
    Write-Host "$($Summary.ModifiedCount)" -ForegroundColor Yellow
    
    Write-Host "Fichiers ajoutés     : " -NoNewline
    Write-Host "$($Summary.AddedCount)" -ForegroundColor Green
    
    Write-Host "Fichiers supprimés   : " -NoNewline
    Write-Host "$($Summary.DeletedCount)" -ForegroundColor Red
    
    Write-Host "Fichiers non trackés : " -NoNewline
    Write-Host "$($Summary.UntrackedCount)" -ForegroundColor Gray
    
    Write-Host "`nTotal fichiers       : " -NoNewline
    Write-Host "$($Summary.TotalFiles)" -ForegroundColor Cyan
    
    Write-Section "📁 TYPES DE FICHIERS"
    
    Write-Host "Markdown (.md)  : $($Summary.MarkdownFiles) fichiers"
    Write-Host "HTML (.html)    : $($Summary.HtmlFiles) fichiers"
    Write-Host "PowerShell (.ps1): $($Summary.PowerShellFiles) fichiers"
    Write-Host "CSV (.csv)      : $($Summary.CsvFiles) fichiers"
    
    if ($GitStats.Added.Count -gt 0) {
        Write-Section "✓ FICHIERS AJOUTÉS"
        foreach ($file in $GitStats.Added) {
            Write-Host "  + $file" -ForegroundColor Green
        }
    }
    
    if ($GitStats.Modified.Count -gt 0) {
        Write-Section "⚠ FICHIERS MODIFIÉS"
        foreach ($file in $GitStats.Modified) {
            Write-Host "  ~ $file" -ForegroundColor Yellow
        }
    }
    
    if ($GitStats.Deleted.Count -gt 0) {
        Write-Section "✗ FICHIERS SUPPRIMÉS"
        foreach ($file in $GitStats.Deleted) {
            Write-Host "  - $file" -ForegroundColor Red
        }
    }
}

#endregion

# MAIN
Write-Title "INVENTAIRE SESSION REDDIXIA v1.0"

Write-Host "Repository : $RepoPath`n" -ForegroundColor Cyan

# Créer le répertoire de sortie s'il n'existe pas
$outputDirPath = Join-Path $RepoPath $OutputDir
if (-not (Test-Path $outputDirPath)) {
    New-Item -ItemType Directory -Path $outputDirPath -Force | Out-Null
}

# Récupérer les données
Write-Host "🔄 Collecte des données Git..." -ForegroundColor Cyan
$gitStats = Get-GitStats -RepoPath $RepoPath

Write-Host "📁 Analyse de l'inventaire des fichiers..." -ForegroundColor Cyan
$fileInventory = Get-FileInventory -RepoPath $RepoPath

Write-Host "📊 Génération du résumé..." -ForegroundColor Cyan
$summary = Get-SessionSummary -GitStats $gitStats -FileInventory $fileInventory

# Export selon le format demandé
Write-Section "EXPORT DES RAPPORTS"

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

if ($OutputFormat -in @('All', 'Markdown')) {
    $mdPath = Join-Path $outputDirPath "Session_$timestamp.md"
    Export-AsMarkdown -Summary $summary -GitStats $gitStats -OutputPath $mdPath
    Write-Host "✓ Markdown : $mdPath" -ForegroundColor Green
}

if ($OutputFormat -in @('All', 'Json')) {
    $jsonPath = Join-Path $outputDirPath "Session_$timestamp.json"
    Export-AsJson -Summary $summary -GitStats $gitStats -OutputPath $jsonPath
    Write-Host "✓ JSON     : $jsonPath" -ForegroundColor Green
}

if ($OutputFormat -in @('All', 'Html')) {
    $htmlPath = Join-Path $outputDirPath "Session_$timestamp.html"
    Export-AsHtml -Summary $summary -GitStats $gitStats -OutputPath $htmlPath
    Write-Host "✓ HTML     : $htmlPath" -ForegroundColor Green
}

if ($OutputFormat -in @('All', 'Console')) {
    Export-ToConsole -Summary $summary -GitStats $gitStats
}

Write-Section "✅ RAPPORT GÉNÉRÉ AVEC SUCCÈS"
Write-Host "Fichiers disponibles dans: $outputDirPath`n" -ForegroundColor Green
