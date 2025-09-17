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
Get-ChildItem -Path $rootPath -File | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination $outputPath
  Write-Host "Copied $($_.Name) to root" -ForegroundColor Green
}

# Copy and flatten each directory
foreach ($dir in $directories) {
  Write-Host "Processing $dir directory..."
  $sourceDirPath = Join-Path -Path $rootPath -ChildPath $dir
  $targetDirPath = Join-Path -Path $outputPath -ChildPath $dir

  # First copy all files in the root of this directory
  Get-ChildItem -Path $sourceDirPath -File | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $targetDirPath
    Write-Host "Copied $($_.Name) to $dir/" -ForegroundColor Green
  }

  # Then process all subdirectories
  Get-ChildItem -Path $sourceDirPath -Directory | ForEach-Object {
    $subdirName = $_.Name

    # Process all files in this subdirectory
    Get-ChildItem -Path $_.FullName -File | ForEach-Object {
      $fileName = $_.Name
      $targetFile = Join-Path -Path $targetDirPath -ChildPath $fileName

      # Check if file with same name already exists in target directory
      if (Test-Path $targetFile) {
        # File exists, create a prefixed version
        $newFileName = "$subdirName-$fileName"
        $targetFile = Join-Path -Path $targetDirPath -ChildPath $newFileName
        Copy-Item -Path $_.FullName -Destination $targetFile
        Write-Host "Renamed and copied $($_.FullName) to $dir/$newFileName" -ForegroundColor Yellow
      } else {
        # File doesn't exist, copy directly
        Copy-Item -Path $_.FullName -Destination $targetFile
        Write-Host "Copied $($_.FullName) to $dir/$fileName" -ForegroundColor Green
      }
    }

    # Also process any sub-subdirectories recursively
    Get-ChildItem -Path $_.FullName -Directory -Recurse | ForEach-Object {
      $nestedPath = $_.FullName.Substring($sourceDirPath.Length + 1).Replace("\", "-")

      Get-ChildItem -Path $_.FullName -File | ForEach-Object {
        $fileName = $_.Name
        $newFileName = "$nestedPath-$fileName"
        $targetFile = Join-Path -Path $targetDirPath -ChildPath $newFileName
        Copy-Item -Path $_.FullName -Destination $targetFile
        Write-Host "Nested file copied $($_.FullName) to $dir/$newFileName" -ForegroundColor Cyan
      }
    }
  }
}

# Now fix all the references in the theme files
Write-Host "Updating references in theme files..."
$liquidFiles = Get-ChildItem -Path $outputPath -Recurse -Include "*.liquid", "*.json"

foreach ($file in $liquidFiles) {
  $content = Get-Content -Path $file.FullName -Raw
  $modified = $false

  # Fix section references from section 'dir/file' to section 'file'
  if ($content -match "{%\s*section\s+['\""']([^/]+)/([^'\""]*)['\""]") {
    $content = $content -replace "{%\s*section\s+['\""]([^/]+)/([^'\""]+)['\""]\s*%}", '{% section "$2" %}'
    $modified = $true
  }

  # Fix include/render references from include 'dir/file' to include 'file'
  if ($content -match "{%\s*(include|render)\s+['\""']([^/]+)/([^'\""]*)['\""]") {
    $content = $content -replace "{%\s*(include|render)\s+['\""]([^/]+)/([^'\""]+)['\""]\s*%}", '{% $1 "$3" %}'
    $modified = $true
  }

  # Also fix asset URLs
  if ($content -match "assets/[^/]+/") {
    $content = $content -replace "assets/([^/]+)/([^'\""]+)", 'assets/$2'
    $modified = $true
  }

  if ($modified) {
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated references in $($file.Name)" -ForegroundColor Cyan
  }
}

Write-Host "Theme flattening completed successfully!" -ForegroundColor Green
Write-Host "You can now deploy the theme from: $outputPath" -ForegroundColor Green
