param (
    [string]$sourceDir = "C:\Shopify\dawn\Orginal Theme Files",
    [string]$outputDir = "C:\Shopify\dawn\dawn-restored",
    [switch]$Force
)

# Define paths
$originalThemePath = $sourceDir
$restoredThemePath = $outputDir

# Check if the restored theme directory already exists and has content
if ((Test-Path -Path $restoredThemePath) -and (Get-ChildItem -Path $restoredThemePath) -and -not $Force) {
    Write-Warning "The restored theme directory already exists and contains files. Use -Force to overwrite."
    exit
}

# Create the restored theme directory if it doesn't exist
if (-not (Test-Path -Path $restoredThemePath)) {
    New-Item -Path $restoredThemePath -ItemType Directory -Force | Out-Null
    Write-Host "Created directory for restored theme at $restoredThemePath"
}
elseif ($Force) {
    # Clean the directory if -Force is specified
    Get-ChildItem -Path $restoredThemePath -Recurse | Remove-Item -Recurse -Force
    Write-Host "Cleaned the restored theme directory for fresh restore"
}

# Function to create directories
function New-ThemeDirectory {
    param (
        [string]$Path
    )

    if (-not (Test-Path -Path $Path)) {
        New-Item -Path $Path -ItemType Directory -Force | Out-Null
        Write-Host "Created directory: $Path"
    }
}

# Create the main directories (Shopify's flat structure)
Write-Host "Creating main directory structure..."
$mainDirs = @(
    "assets",
    "config",
    "layout",
    "locales",
    "sections",
    "snippets",
    "templates",
    "templates\customers"
)

foreach ($dir in $mainDirs) {
    New-ThemeDirectory -Path "$restoredThemePath\$dir"
}

# Copy the core theme files (non-nested)
Write-Host "Copying core theme files..."
$coreFiles = Get-ChildItem -Path $originalThemePath -File | Where-Object { $_.Name -notlike "flatten-*" }
foreach ($file in $coreFiles) {
    Copy-Item -Path $file.FullName -Destination "$restoredThemePath\$($file.Name)"
    Write-Host "Copied $($file.Name) to root"
}

# Function to copy files preserving directory structure
function Copy-FilesFromOriginal {
    param (
        [string]$SourcePath,
        [string]$DestinationPath,
        [string]$Pattern = "*"
    )

    if (Test-Path -Path $SourcePath) {
        $files = Get-ChildItem -Path $SourcePath -File -Filter $Pattern

        foreach ($file in $files) {
            Copy-Item -Path $file.FullName -Destination "$DestinationPath\$($file.Name)"
            Write-Host "Copied $($file.Name) to $DestinationPath"
        }
    }
    else {
        Write-Warning "Source path does not exist: $SourcePath"
    }
}

# Copy assets files
Write-Host "Copying assets files..."
Copy-FilesFromOriginal -SourcePath "$originalThemePath\assets" -DestinationPath "$restoredThemePath\assets"

# No need to copy subdirectories for CSS, icons, images, or JS since Shopify requires flat structure
Write-Host "Copying all asset files to flat structure..."
Copy-FilesFromOriginal -SourcePath "$originalThemePath\assets" -DestinationPath "$restoredThemePath\assets"

# Also check if there are any nested directories that need to be flattened
if (Test-Path -Path "$originalThemePath\assets") {
    $assetSubdirs = @("css", "icons", "images", "js")
    foreach ($subdir in $assetSubdirs) {
        $subdirPath = "$originalThemePath\assets\$subdir"
        if (Test-Path -Path $subdirPath) {
            # Copy all files from subdirectories directly to assets (flatten structure)
            Get-ChildItem -Path $subdirPath -File -Recurse | ForEach-Object {
                $fileName = $_.Name
                # Check for name conflicts
                if (Test-Path -Path "$restoredThemePath\assets\$fileName") {
                    $prefixedName = "$($subdir)-$fileName"
                    Copy-Item -Path $_.FullName -Destination "$restoredThemePath\assets\$prefixedName"
                    Write-Host "Renamed and copied $($_.Name) to assets\$prefixedName (flattened)"
                } else {
                    Copy-Item -Path $_.FullName -Destination "$restoredThemePath\assets\$fileName"
                    Write-Host "Copied $($_.Name) to assets\$fileName (flattened)"
                }
            }
        }
    }
}

# Copy config files
Write-Host "Copying config files..."
Copy-FilesFromOriginal -SourcePath "$originalThemePath\config" -DestinationPath "$restoredThemePath\config"

# Copy layout files
Write-Host "Copying layout files..."
Copy-FilesFromOriginal -SourcePath "$originalThemePath\layout" -DestinationPath "$restoredThemePath\layout"

# Copy locale files
Write-Host "Copying locale files..."
Copy-FilesFromOriginal -SourcePath "$originalThemePath\locales" -DestinationPath "$restoredThemePath\locales"

# Copy section files
Write-Host "Copying section files..."
Copy-FilesFromOriginal -SourcePath "$originalThemePath\sections" -DestinationPath "$restoredThemePath\sections"

# Copy section subdirectory files
$sectionSubdirs = @("blog", "cart", "collection", "customer", "global", "misc", "page", "product", "quick-order", "search")
foreach ($subdir in $sectionSubdirs) {
    Write-Host "Copying section files from $subdir..."
    Copy-FilesFromOriginal -SourcePath "$originalThemePath\sections\$subdir" -DestinationPath "$restoredThemePath\sections\$subdir"
}

# Copy snippet files
Write-Host "Copying snippet files..."
Copy-FilesFromOriginal -SourcePath "$originalThemePath\snippets" -DestinationPath "$restoredThemePath\snippets"

# Copy snippet subdirectory files
$snippetSubdirs = @("cart", "components", "header", "icons", "localization", "product", "quick-order", "utils")
foreach ($subdir in $snippetSubdirs) {
    Write-Host "Copying snippet files from $subdir..."
    Copy-FilesFromOriginal -SourcePath "$originalThemePath\snippets\$subdir" -DestinationPath "$restoredThemePath\snippets\$subdir"
}

# Copy template files
Write-Host "Copying template files..."
Copy-FilesFromOriginal -SourcePath "$originalThemePath\templates" -DestinationPath "$restoredThemePath\templates"
Copy-FilesFromOriginal -SourcePath "$originalThemePath\templates\customers" -DestinationPath "$restoredThemePath\templates\customers"

Write-Host "Theme restoration completed successfully!"
Write-Host "The original theme structure has been restored to: $restoredThemePath"
Write-Host "You can now deploy this theme to Shopify."
