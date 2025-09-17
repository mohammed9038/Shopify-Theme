param (
    [switch]$Force,
    [string]$devDir = "C:\Shopify\dawn\dawn-dev",
    [string]$flatDir = "C:\Shopify\dawn\dawn-flat"
)

# Function to display usage information
function Show-Usage {
    Write-Host "Shopify Theme Development Workflow Setup" -ForegroundColor Cyan
    Write-Host "------------------------------------------" -ForegroundColor Cyan
    Write-Host "This script sets up a workflow for Shopify theme development that allows you to:"
    Write-Host "1. Develop with a clean, organized folder structure locally"
    Write-Host "2. Deploy a flattened version of your theme to Shopify"
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\setup-shopify-workflow.ps1 [-Force] [-devDir path\to\dev] [-flatDir path\to\flat]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "  -Force        : Overwrite existing directories" -ForegroundColor Yellow
    Write-Host "  -devDir       : Path to create development directory (default: C:\Shopify\dawn\dawn-dev)" -ForegroundColor Yellow
    Write-Host "  -flatDir      : Path to create flattened directory (default: C:\Shopify\dawn\dawn-flat)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Workflow:" -ForegroundColor Green
    Write-Host "1. Develop your theme in the development directory ($devDir)" -ForegroundColor Green
    Write-Host "2. When ready to deploy, run: .\flatten-theme-final.ps1" -ForegroundColor Green
    Write-Host "3. Deploy the flattened theme from ($flatDir)" -ForegroundColor Green
}

# Show usage information
Show-Usage

# Confirm before proceeding
$confirmation = Read-Host "Do you want to set up this workflow? (y/n)"
if ($confirmation -ne 'y') {
    Write-Host "Setup cancelled." -ForegroundColor Yellow
    exit
}

# Check if we have an existing development structure
if ((Test-Path $devDir) -and -not $Force) {
    Write-Host "Development directory already exists at $devDir. Use -Force to overwrite." -ForegroundColor Red
    exit 1
}

if ((Test-Path $flatDir) -and -not $Force) {
    Write-Host "Flat directory already exists at $flatDir. Use -Force to overwrite." -ForegroundColor Red
    exit 1
}

# Set up the development structure first
Write-Host "`nSetting up development structure..." -ForegroundColor Cyan
Write-Host "----------------------------" -ForegroundColor Cyan

# Create the development directory structure using our script
& "$PSScriptRoot\create-dev-structure.ps1" -outputDir $devDir -Force:$Force

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to create development structure. See errors above." -ForegroundColor Red
    exit 1
}

Write-Host "`nDevelopment structure created successfully at: $devDir" -ForegroundColor Green

# Set up aliases for the workflow commands in your PowerShell profile
$profilePath = $PROFILE
$profileContent = @"

# Shopify Theme Development Workflow
function Sync-ShopifyTheme {
    param([switch]$Force)

    Write-Host "Flattening theme for Shopify deployment..." -ForegroundColor Cyan
    & "$PSScriptRoot\flatten-theme-final.ps1" -rootPath "$devDir" -outputPath "$flatDir" -force:`$Force

    if (`$LASTEXITCODE -eq 0) {
        Write-Host "Theme flattened successfully to: $flatDir" -ForegroundColor Green
        Write-Host "You can now deploy this theme to Shopify." -ForegroundColor Green
    }
}

# Add aliases for easy access
Set-Alias -Name shopify-sync -Value Sync-ShopifyTheme
"@

# Check if the profile exists, create if it doesn't
if (-not (Test-Path $profilePath)) {
    New-Item -Path $profilePath -ItemType File -Force | Out-Null
}

# Add the workflow functions to the PowerShell profile
$currentProfile = Get-Content $profilePath -Raw
if (-not ($currentProfile -match "Shopify Theme Development Workflow")) {
    Add-Content -Path $profilePath -Value $profileContent
    Write-Host "`nAdded Shopify theme workflow commands to your PowerShell profile." -ForegroundColor Green
    Write-Host "You can now use 'shopify-sync' to flatten your theme for deployment." -ForegroundColor Green
}

# Create a README file in the development directory
$readmePath = Join-Path $devDir "WORKFLOW.md"
$readmeContent = @"
# Shopify Theme Development Workflow

This directory contains the development version of your Shopify theme with a clean, organized folder structure.

## Directory Structure

- **assets/** - Theme assets
  - **css/** - CSS files
  - **js/** - JavaScript files
  - **icons/** - SVG icons
  - **images/** - Image files
- **config/** - Theme settings
- **layout/** - Layout templates
- **sections/** - Organized by purpose (global, product, cart, etc.)
- **snippets/** - Organized by functionality
- **templates/** - Page templates

## Workflow

### Development

1. Make all your changes in this directory structure
2. Test locally using the Shopify CLI or Theme Kit

### Deployment

When you're ready to deploy to Shopify:

1. Open PowerShell and run:
   ```
   shopify-sync
   ```

2. This will create a flattened version of your theme at:
   `$flatDir`

3. Deploy the flattened theme to Shopify using the Shopify CLI:
   ```
   cd $flatDir
   shopify theme push
   ```

### Important Notes

- **Never edit the flattened theme directly** - All changes should be made in this development directory.
- If you need to recreate the flattened theme, use the `-Force` flag:
  ```
  shopify-sync -Force
  ```
"@

Set-Content -Path $readmePath -Value $readmeContent
Write-Host "`nCreated WORKFLOW.md guide in the development directory." -ForegroundColor Green

Write-Host "`nSetup Complete!" -ForegroundColor Green
Write-Host "------------------------------------------" -ForegroundColor Green
Write-Host "Your Shopify theme development workflow is ready:"
Write-Host "1. Develop in: $devDir"
Write-Host "2. Deploy from: $flatDir"
Write-Host ""
Write-Host "To flatten your theme for deployment, run:" -ForegroundColor Cyan
Write-Host "   shopify-sync" -ForegroundColor Yellow
Write-Host ""
Write-Host "You may need to restart your PowerShell session to use the new commands." -ForegroundColor Yellow
