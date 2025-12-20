cd "c:\ArchiMate\Idexios\Repo Git\Reddixia"

# Générer tous les rapports (HTML, JSON, Markdown, Console)
.\Session-Inventory.ps1

# Ou format spécifique
.\Session-Inventory.ps1 -OutputFormat Html
.\Session-Inventory.ps1 -OutputFormat Json
.\Session-Inventory.ps1 -OutputFormat Markdown
.\Session-Inventory.ps1 -OutputFormat Console