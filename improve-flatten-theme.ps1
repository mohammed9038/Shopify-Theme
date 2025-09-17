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

# Function to check and rename files if there's a conflict
function Copy-FileWithRenaming {
  param (
    [string]$sourcePath,
    [string]$destDir,
    [string]$fileName,
    [bool]$isWrapper = $false,
    [bool]$isSubdirFile = $false
  )

  $destPath = Join-Path -Path $destDir -ChildPath $fileName

  # If the destination file already exists
  if (Test-Path $destPath) {
    # If this is a root-level file and there's a conflict with a subdirectory file
    # we prioritize the root file (possibly a wrapper)
    if ($isWrapper -and $isSubdirFile) {
      Write-Host "Skipping $sourcePath - wrapper exists at root level" -ForegroundColor Yellow
      return $false
    }

    # If it's a collision between files from different subdirectories
    # we prefix with the directory name
    $dirName = Split-Path -Path (Split-Path -Path $sourcePath -Parent) -Leaf
    $newFileName = "$dirName-$fileName"
    $destPath = Join-Path -Path $destDir -ChildPath $newFileName

    Write-Host "Renaming $fileName to $newFileName to avoid conflict" -ForegroundColor Yellow
  }

  Copy-Item -Path $sourcePath -Destination $destPath
  Write-Host "Copied $sourcePath to $destPath" -ForegroundColor Green

  return $true
}

# Process assets directory
Write-Host "Flattening assets directory..."

# Map of original paths to flattened names for reference updating later
$pathMapping = @{}

# First process root-level files
Get-ChildItem -Path "$rootPath\assets" -File | ForEach-Object {
  $copied = Copy-FileWithRenaming -sourcePath $_.FullName -destDir "$outputPath\assets" -fileName $_.Name -isWrapper $true
  if ($copied) {
    $pathMapping[$_.FullName.Replace($rootPath, "").TrimStart("\")] = "assets/$($_.Name)"
  }
}

# Process subdirectories
Get-ChildItem -Path "$rootPath\assets" -Directory | ForEach-Object {
  $subdir = $_
  $subdirName = $subdir.Name

  Get-ChildItem -Path $subdir.FullName -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($subdir.FullName.Length + 1)

    # If there are nested subdirectories inside the asset subdirectory
    if ($relativePath.Contains('\')) {
      $nestedSubDir = Split-Path -Path $relativePath -Parent
      $fileName = "$subdirName-$($nestedSubDir.Replace('\', '-'))-$($_.Name)"
    } else {
      $fileName = $_.Name
    }

    $copied = Copy-FileWithRenaming -sourcePath $_.FullName -destDir "$outputPath\assets" -fileName $fileName -isSubdirFile $true
    if ($copied) {
      $pathMapping[$_.FullName.Replace($rootPath, "").TrimStart("\")] = "assets/$fileName"
    }
  }
}

# Process config directory (no subdirectories typically)
Write-Host "Copying config directory..."
Get-ChildItem -Path "$rootPath\config" -File | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination (Join-Path -Path "$outputPath\config" -ChildPath $_.Name)
  Write-Host "Copied $($_.FullName) to $outputPath\config\$($_.Name)" -ForegroundColor Green
}

# Process layout directory (no subdirectories typically)
Write-Host "Copying layout directory..."
Get-ChildItem -Path "$rootPath\layout" -File | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination (Join-Path -Path "$outputPath\layout" -ChildPath $_.Name)
  Write-Host "Copied $($_.FullName) to $outputPath\layout\$($_.Name)" -ForegroundColor Green
}

# Process locales directory (no subdirectories typically)
Write-Host "Copying locales directory..."
Get-ChildItem -Path "$rootPath\locales" -File | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination (Join-Path -Path "$outputPath\locales" -ChildPath $_.Name)
  Write-Host "Copied $($_.FullName) to $outputPath\locales\$($_.Name)" -ForegroundColor Green
}

# Process sections directory
Write-Host "Flattening sections directory..."

# First process root-level sections (possible wrappers)
Get-ChildItem -Path "$rootPath\sections" -File | ForEach-Object {
  $copied = Copy-FileWithRenaming -sourcePath $_.FullName -destDir "$outputPath\sections" -fileName $_.Name -isWrapper $true
  if ($copied) {
    $pathMapping[$_.FullName.Replace($rootPath, "").TrimStart("\")] = "sections/$($_.Name)"
  }
}

# Process section subdirectories
Get-ChildItem -Path "$rootPath\sections" -Directory | ForEach-Object {
  $subdir = $_
  $subdirName = $subdir.Name

  Get-ChildItem -Path $subdir.FullName -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($subdir.FullName.Length + 1)

    # If there are nested subdirectories
    if ($relativePath.Contains('\')) {
      $nestedSubDir = Split-Path -Path $relativePath -Parent
      $fileName = "$subdirName-$($nestedSubDir.Replace('\', '-'))-$($_.Name)"
    } else {
      $fileName = $_.Name
    }

    $copied = Copy-FileWithRenaming -sourcePath $_.FullName -destDir "$outputPath\sections" -fileName $fileName -isSubdirFile $true
    if ($copied) {
      $pathMapping[$_.FullName.Replace($rootPath, "").TrimStart("\")] = "sections/$fileName"
    }
  }
}

# Process snippets directory
Write-Host "Flattening snippets directory..."

# First process root-level snippets (possible wrappers)
Get-ChildItem -Path "$rootPath\snippets" -File | ForEach-Object {
  $copied = Copy-FileWithRenaming -sourcePath $_.FullName -destDir "$outputPath\snippets" -fileName $_.Name -isWrapper $true
  if ($copied) {
    $pathMapping[$_.FullName.Replace($rootPath, "").TrimStart("\")] = "snippets/$($_.Name)"
  }
}

# Process snippet subdirectories
Get-ChildItem -Path "$rootPath\snippets" -Directory | ForEach-Object {
  $subdir = $_
  $subdirName = $subdir.Name

  Get-ChildItem -Path $subdir.FullName -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($subdir.FullName.Length + 1)

    # If there are nested subdirectories
    if ($relativePath.Contains('\')) {
      $nestedSubDir = Split-Path -Path $relativePath -Parent
      $fileName = "$subdirName-$($nestedSubDir.Replace('\', '-'))-$($_.Name)"
    } else {
      $fileName = $_.Name
    }

    $copied = Copy-FileWithRenaming -sourcePath $_.FullName -destDir "$outputPath\snippets" -fileName $fileName -isSubdirFile $true
    if ($copied) {
      $pathMapping[$_.FullName.Replace($rootPath, "").TrimStart("\")] = "snippets/$fileName"
    }
  }
}

# Process templates directory
Write-Host "Copying templates directory..."
Get-ChildItem -Path "$rootPath\templates" -File | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination (Join-Path -Path "$outputPath\templates" -ChildPath $_.Name)
  Write-Host "Copied $($_.FullName) to $outputPath\templates\$($_.Name)" -ForegroundColor Green
}

# This function will update references in liquid files to point to flattened structure
function Update-LiquidReferences {
  param (
    [string]$filePath,
    [hashtable]$pathMappings
  )

  $content = Get-Content $filePath -Raw
  $modified = $false

  # Update includes/renders that reference subdirectories
  $patterns = @(
    # Pattern for includes/renders with subdirectories
    @{
      Pattern = "{%\s*(include|render)\s+'([^/]+)/([^']+)'";
      Replacement = '{% $1 ''$3''';
    },
    # Pattern for sections with subdirectories
    @{
      Pattern = "{%\s*section\s+'([^/]+)/([^']+)'";
      Replacement = '{% section ''$2''';
    },
    # Pattern for asset URLs with subdirectories
    @{
      Pattern = "(?<={{[\s]*['|`"])(assets/[^/]+/[^'`"]*)(?=['|`"][\s]*\|)";
      Replacement = 'assets/$2';
    }
  )

  foreach ($p in $patterns) {
    if ($content -match $p.Pattern) {
      $content = [regex]::Replace($content, $p.Pattern, $p.Replacement)
      $modified = $true
      Write-Host "  - Updated references in $filePath" -ForegroundColor Cyan
    }
  }

  # Also fix asset paths with CSS url() functions
  if ($filePath -match "\.css$" -or $filePath -match "\.scss$") {
    $urlPattern = "url\(['`"]?([^'`"\)]+)['`"]?\)"
    $urlMatches = [regex]::Matches($content, $urlPattern)

    foreach ($match in $urlMatches) {
      $url = $match.Groups[1].Value

      # Check if it's a relative path to another asset
      if ($url -match "^\.\./") {
        $newUrl = $url -replace "^\.\./", ""
        $content = $content.Replace($url, $newUrl)
        $modified = $true
        Write-Host "  - Updated CSS URL from $url to $newUrl in $filePath" -ForegroundColor Cyan
      }
    }
  }

  if ($modified) {
    Set-Content -Path $filePath -Value $content
    Write-Host "Updated references in $filePath" -ForegroundColor Green
  }
}

# Update all references in liquid files
Write-Host "Updating liquid references to match flattened structure..."
$allFiles = Get-ChildItem -Path $outputPath -Recurse -File

foreach ($file in $allFiles) {
  Update-LiquidReferences -filePath $file.FullName -pathMappings $pathMapping
}

# Check for any remaining issues
Write-Host "Running final validation checks..."
$issues = @()

$allLiquidFiles = Get-ChildItem -Path $outputPath -Recurse -Filter "*.liquid"
foreach ($file in $allLiquidFiles) {
  $content = Get-Content $file.FullName -Raw

  # Check for {% include 'x' %}, {% render 'x' %}, and {% section 'x' %} patterns
  $includeMatches = [regex]::Matches($content, "{%\s*(include|render)\s+'([^']+)'")
  foreach ($match in $includeMatches) {
    $snippetName = $match.Groups[2].Value
    if (-not $snippetName.EndsWith('.liquid')) {
      $snippetName = "$snippetName.liquid"
    }

    $snippetPath = Join-Path -Path "$outputPath\snippets" -ChildPath $snippetName
    if (-not (Test-Path $snippetPath)) {
      $issues += "Missing snippet: $snippetName (referenced in $($file.Name))"
    }
  }

  $sectionMatches = [regex]::Matches($content, "{%\s*section\s+'([^']+)'")
  foreach ($match in $sectionMatches) {
    $sectionName = $match.Groups[1].Value
    if (-not $sectionName.EndsWith('.liquid')) {
      $sectionName = "$sectionName.liquid"
    }

    $sectionPath = Join-Path -Path "$outputPath\sections" -ChildPath $sectionName
    if (-not (Test-Path $sectionPath)) {
      $issues += "Missing section: $sectionName (referenced in $($file.Name))"
    }
  }
}

# Check for subdirectories that shouldn't exist
$illegalSubdirs = @()
foreach ($dir in $directories) {
  $dirPath = Join-Path -Path $outputPath -ChildPath $dir
  $subdirs = Get-ChildItem -Path $dirPath -Directory
  if ($subdirs) {
    foreach ($subdir in $subdirs) {
      $illegalSubdirs += "$dir/$($subdir.Name)"
    }
  }
}

if ($illegalSubdirs.Count -gt 0) {
  $issues += "WARNING: Found illegal subdirectories that will cause Shopify errors:"
  $issues += $illegalSubdirs
}

if ($issues.Count -gt 0) {
  Write-Host "Found issues that need attention:" -ForegroundColor Yellow
  $issues | ForEach-Object {
    Write-Host "  - $_" -ForegroundColor Yellow
  }
}

Write-Host "Directory structure flattened successfully!" -ForegroundColor Green
Write-Host "You can now deploy the flattened theme from: $outputPath"
Write-Host "If warnings were reported above, please check them before deployment."
