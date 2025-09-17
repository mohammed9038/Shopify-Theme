param(
  [string]$rootPath = "C:\Shopify\dawn",
  [string]$outputPath = "C:\Shopify\dawn-flattened",
  [switch]$force = $false
)

# Create output directory structure
Write-Host "Creating output directory structure..."
$directories = @(
  "assets",
  "config",
  "layout",
  "locales",
  "sections",
  "snippets",
  "templates"
)

# Create the output root if it doesn't exist
if (-not (Test-Path $outputPath)) {
  New-Item -Path $outputPath -ItemType Directory | Out-Null
  Write-Host "Created output directory at $outputPath" -ForegroundColor Green
}
elseif ($force) {
  # If output exists and force is specified, delete it and recreate
  Remove-Item -Path $outputPath -Recurse -Force
  New-Item -Path $outputPath -ItemType Directory | Out-Null
  Write-Host "Recreated output directory at $outputPath" -ForegroundColor Green
}
else {
  Write-Host "Output directory already exists. Use -force to overwrite." -ForegroundColor Yellow
  return
}

# Create the standard Shopify directories
foreach ($dir in $directories) {
  $dirPath = Join-Path -Path $outputPath -ChildPath $dir
  if (-not (Test-Path $dirPath)) {
    New-Item -Path $dirPath -ItemType Directory | Out-Null
    Write-Host "Created $dir directory" -ForegroundColor Green
  }
}

# Copy non-nested files directly
Write-Host "Copying non-nested files..."
# Root files
Get-ChildItem -Path $rootPath -File | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination $outputPath
  Write-Host "Copied $($_.Name) to root" -ForegroundColor Green
}

# Handle assets directory with proper conflict handling
Write-Host "Flattening assets directory..."

# First gather all file names to check for conflicts
$assetFiles = @{}
$duplicateFiles = @()

Get-ChildItem -Path "$rootPath\assets" -Recurse -File | ForEach-Object {
  if ($assetFiles.ContainsKey($_.Name)) {
    # Found duplicate
    $duplicateFiles += $_.Name
  }
  else {
    $assetFiles[$_.Name] = $_.FullName
  }
}

# Report any duplicates
if ($duplicateFiles.Count -gt 0) {
  Write-Host "Warning: Found duplicate asset filenames:" -ForegroundColor Yellow
  $duplicateFiles | ForEach-Object {
    Write-Host "  - $_" -ForegroundColor Yellow
  }
}

# Process first-level assets first
Get-ChildItem -Path "$rootPath\assets" -File | ForEach-Object {
  $destination = Join-Path -Path "$outputPath\assets" -ChildPath $_.Name
  Copy-Item -Path $_.FullName -Destination $destination
  Write-Host "Copied $($_.FullName) to $destination" -ForegroundColor Green
}

# Now process subdirectories - skipping files that would conflict with root level
Get-ChildItem -Path "$rootPath\assets" -Directory | ForEach-Object {
  $subdir = $_
  Get-ChildItem -Path $subdir.FullName -File | ForEach-Object {
    $fileName = $_.Name
    $destination = Join-Path -Path "$outputPath\assets" -ChildPath $fileName

    # Check if we have the same file at root level
    $rootAssetPath = Join-Path -Path "$rootPath\assets" -ChildPath $fileName
    if (Test-Path $rootAssetPath) {
      # This is a duplicate with a root file, skip it
      Write-Host "Skipping $($_.FullName) - asset exists at root level" -ForegroundColor Yellow
    }
    else {
      Copy-Item -Path $_.FullName -Destination $destination
      Write-Host "Copied $($_.FullName) to $destination" -ForegroundColor Green
    }
  }
}

# Handle config directory
Write-Host "Copying config directory..."
Get-ChildItem -Path "$rootPath\config" -File | ForEach-Object {
  $destination = Join-Path -Path "$outputPath\config" -ChildPath $_.Name
  Copy-Item -Path $_.FullName -Destination $destination
  Write-Host "Copied $($_.FullName) to $destination" -ForegroundColor Green
}

# Handle layout directory
Write-Host "Copying layout directory..."
Get-ChildItem -Path "$rootPath\layout" -File | ForEach-Object {
  $destination = Join-Path -Path "$outputPath\layout" -ChildPath $_.Name
  Copy-Item -Path $_.FullName -Destination $destination
  Write-Host "Copied $($_.FullName) to $destination" -ForegroundColor Green
}

# Handle locales directory
Write-Host "Copying locales directory..."
Get-ChildItem -Path "$rootPath\locales" -File | ForEach-Object {
  $destination = Join-Path -Path "$outputPath\locales" -ChildPath $_.Name
  Copy-Item -Path $_.FullName -Destination $destination
  Write-Host "Copied $($_.FullName) to $destination" -ForegroundColor Green
}

# Handle sections directory - flatten subdirectories with special handling for wrappers
Write-Host "Flattening sections directory..."

# Process first-level sections (wrappers) first
Get-ChildItem -Path "$rootPath\sections" -File | ForEach-Object {
  $destination = Join-Path -Path "$outputPath\sections" -ChildPath $_.Name
  Copy-Item -Path $_.FullName -Destination $destination
  Write-Host "Copied $($_.FullName) to $destination" -ForegroundColor Green
}

# Now process subdirectories
# Need to skip duplicate files already present at root level
Get-ChildItem -Path "$rootPath\sections" -Directory | ForEach-Object {
  $subdir = $_
  Get-ChildItem -Path $subdir.FullName -File | ForEach-Object {
    $fileName = $_.Name
    $destination = Join-Path -Path "$outputPath\sections" -ChildPath $fileName

    # Check if we have a wrapper file
    $rootSectionPath = Join-Path -Path "$rootPath\sections" -ChildPath $fileName
    if (Test-Path $rootSectionPath) {
      # This is a duplicate with a wrapper, skip it
      Write-Host "Skipping $($_.FullName) - wrapper exists at root level" -ForegroundColor Yellow
    }
    else {
      Copy-Item -Path $_.FullName -Destination $destination
      Write-Host "Copied $($_.FullName) to $destination" -ForegroundColor Green
    }
  }
}

# Handle snippets directory - flatten subdirectories with special handling for wrappers
Write-Host "Flattening snippets directory..."

# Process first-level snippets (wrappers) first
Get-ChildItem -Path "$rootPath\snippets" -File | ForEach-Object {
  $destination = Join-Path -Path "$outputPath\snippets" -ChildPath $_.Name
  Copy-Item -Path $_.FullName -Destination $destination
  Write-Host "Copied $($_.FullName) to $destination" -ForegroundColor Green
}

# Now process subdirectories
# Need to skip duplicate files already present at root level
Get-ChildItem -Path "$rootPath\snippets" -Directory | ForEach-Object {
  $subdir = $_
  Get-ChildItem -Path $subdir.FullName -File | ForEach-Object {
    $fileName = $_.Name
    $destination = Join-Path -Path "$outputPath\snippets" -ChildPath $fileName

    # Check if we have a wrapper file
    $rootSnippetPath = Join-Path -Path "$rootPath\snippets" -ChildPath $fileName
    if (Test-Path $rootSnippetPath) {
      # This is a duplicate with a wrapper, skip it
      Write-Host "Skipping $($_.FullName) - wrapper exists at root level" -ForegroundColor Yellow
    }
    else {
      Copy-Item -Path $_.FullName -Destination $destination
      Write-Host "Copied $($_.FullName) to $destination" -ForegroundColor Green
    }
  }
}

# Handle templates directory
Write-Host "Copying templates directory..."
Get-ChildItem -Path "$rootPath\templates" -Recurse -File | ForEach-Object {
  $destination = Join-Path -Path "$outputPath\templates" -ChildPath $_.Name
  Copy-Item -Path $_.FullName -Destination $destination
  Write-Host "Copied $($_.FullName) to $destination" -ForegroundColor Green
}

# Final validation steps
Write-Host "Running final validation checks..."

# Check for any missing includes/renders in theme files
$missingFiles = @()
$allLiquidFiles = Get-ChildItem -Path $outputPath -Recurse -Filter "*.liquid"

# This function will fix references in liquid files to point to flattened structure
function Update-LiquidReferences {
  param (
    [string]$filePath
  )

  $content = Get-Content $filePath -Raw
  $modified = $false

  # Update includes/renders that reference subdirectories
  $patterns = @(
    # Pattern for includes/renders with subdirectories
    @{
      Pattern     = "{%\s*(include|render)\s+'([^/]+)/([^']+)'";
      Replacement = '{% $1 ''$3''';
    },
    # Pattern for sections with subdirectories
    @{
      Pattern     = "{%\s*section\s+'([^/]+)/([^']+)'";
      Replacement = '{% section ''$2''';
    }
  )

  foreach ($p in $patterns) {
    if ($content -match $p.Pattern) {
      $content = [regex]::Replace($content, $p.Pattern, $p.Replacement)
      $modified = $true
      Write-Host "  - Updated references in $filePath" -ForegroundColor Cyan
    }
  }

  if ($modified) {
    Set-Content -Path $filePath -Value $content -NoNewline
  }
}

# First update all references in liquid files
Write-Host "Updating liquid references to match flattened structure..."
foreach ($file in $allLiquidFiles) {
  Update-LiquidReferences -filePath $file.FullName
}

# Now check for any remaining missing includes/renders
Write-Host "Checking for missing references..."
foreach ($file in $allLiquidFiles) {
  $content = Get-Content $file.FullName -Raw

  # Check for {% include 'x' %}, {% render 'x' %}, and {% section 'x' %} patterns
  $includes = [regex]::Matches($content, "{%\s*(include|render)\s+'([^']+)'")
  $sections = [regex]::Matches($content, "{%\s*section\s+'([^']+)'")

  foreach ($match in $includes) {
    $includeName = $match.Groups[2].Value
    # Add .liquid extension if not present
    if (-not $includeName.EndsWith('.liquid')) {
      $includeName = "$includeName.liquid"
    }

    $includePath = Join-Path -Path "$outputPath\snippets" -ChildPath $includeName
    if (-not (Test-Path $includePath)) {
      $missingFiles += "Missing include: $includeName (referenced in $($file.FullName))"
    }
  }

  foreach ($match in $sections) {
    $sectionName = $match.Groups[1].Value
    # Add .liquid extension if not present
    if (-not $sectionName.EndsWith('.liquid')) {
      $sectionName = "$sectionName.liquid"
    }

    $sectionPath = Join-Path -Path "$outputPath\sections" -ChildPath $sectionName
    if (-not (Test-Path $sectionPath)) {
      $missingFiles += "Missing section: $sectionName (referenced in $($file.FullName))"
    }
  }
}

if ($missingFiles.Count -gt 0) {
  Write-Host "Warning: Found references to missing files:" -ForegroundColor Yellow
  $missingFiles | ForEach-Object {
    Write-Host "  - $_" -ForegroundColor Yellow
  }
}

Write-Host "Directory structure flattened successfully!" -ForegroundColor Green
Write-Host "You can now deploy the flattened theme from: $outputPath"
Write-Host "If warnings were reported above, please check them before deployment."
