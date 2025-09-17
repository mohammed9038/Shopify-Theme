param (
    [string]$sourceDir = "C:\Shopify\dawn\Orginal Theme Files",
    [string]$outputDir = "C:\Shopify\dawn\dawn-flat-final",
    [switch]$Force
)

# Check if the output directory already exists
if (Test-Path $outputDir) {
    if ($Force) {
        Write-Host "Output directory exists. Removing it due to -Force parameter."
        Remove-Item -Path $outputDir -Recurse -Force
    }
    else {
        Write-Error "Output directory already exists. Use -Force to overwrite."
        exit 1
    }
}

# Create the output directory structure
$directories = @("assets", "config", "layout", "locales", "sections", "snippets", "templates", "templates\customers")

New-Item -ItemType Directory -Path $outputDir | Out-Null
foreach ($dir in $directories) {
    New-Item -ItemType Directory -Path (Join-Path $outputDir $dir) | Out-Null
}

Write-Host "Created directory structure in $outputDir"

# Function to copy files from a directory
function Copy-Files {
    param (
        [string]$sourcePath,
        [string]$destPath
    )

    if (-not (Test-Path $sourcePath)) {
        Write-Warning "Source path does not exist: $sourcePath"
        return
    }

    # Copy all files directly in the source directory
    Get-ChildItem -Path $sourcePath -File | ForEach-Object {
        Copy-Item $_.FullName -Destination $destPath
        Write-Host "Copied $($_.Name) to $destPath"
    }
}

# Copy files from source to destination
Copy-Files -sourcePath (Join-Path $sourceDir "assets") -destPath (Join-Path $outputDir "assets")
Copy-Files -sourcePath (Join-Path $sourceDir "config") -destPath (Join-Path $outputDir "config")
Copy-Files -sourcePath (Join-Path $sourceDir "layout") -destPath (Join-Path $outputDir "layout")
Copy-Files -sourcePath (Join-Path $sourceDir "locales") -destPath (Join-Path $outputDir "locales")
Copy-Files -sourcePath (Join-Path $sourceDir "sections") -destPath (Join-Path $outputDir "sections")
Copy-Files -sourcePath (Join-Path $sourceDir "snippets") -destPath (Join-Path $outputDir "snippets")
Copy-Files -sourcePath (Join-Path $sourceDir "templates") -destPath (Join-Path $outputDir "templates")

# Handle the customer templates correctly - they need to be in a customers subdirectory
$customersSourcePath = Join-Path $sourceDir "templates\customers"
$customersDestPath = Join-Path $outputDir "templates\customers"

if (Test-Path $customersSourcePath) {
    Get-ChildItem -Path $customersSourcePath -File | ForEach-Object {
        Copy-Item $_.FullName -Destination $customersDestPath
        Write-Host "Copied $($_.Name) to $customersDestPath"
    }
}

Write-Host "Theme files copied successfully to $outputDir"
