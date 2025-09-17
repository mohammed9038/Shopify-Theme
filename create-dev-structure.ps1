param (
    [string]$sourceDir = "C:\Shopify\dawn\dawn-flat-final",
    [string]$outputDir = "C:\Shopify\dawn\dawn-dev",
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
$directories = @(
    "assets",
    "assets/js",
    "assets/js/components",
    "assets/js/utils",
    "assets/css",
    "assets/css/components",
    "assets/css/sections",
    "assets/icons",
    "assets/images",
    "config",
    "layout",
    "locales",
    "sections",
    "sections/global",
    "sections/product",
    "sections/collection",
    "sections/cart",
    "sections/customer",
    "sections/blog",
    "sections/search",
    "sections/page",
    "sections/quick-order",
    "sections/misc",
    "snippets",
    "snippets/components",
    "snippets/product",
    "snippets/cart",
    "snippets/utils",
    "snippets/header",
    "snippets/localization",
    "snippets/icons",
    "snippets/quick-order",
    "templates",
    "templates/customers"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Path (Join-Path $outputDir $dir) | Out-Null
    Write-Host "Created directory: $dir"
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

# Copy configuration files
Copy-Files -sourcePath (Join-Path $sourceDir "config") -destPath (Join-Path $outputDir "config")

# Copy layout files
Copy-Files -sourcePath (Join-Path $sourceDir "layout") -destPath (Join-Path $outputDir "layout")

# Copy locales files
Copy-Files -sourcePath (Join-Path $sourceDir "locales") -destPath (Join-Path $outputDir "locales")

# Copy template files
Copy-Files -sourcePath (Join-Path $sourceDir "templates") -destPath (Join-Path $outputDir "templates")
Copy-Files -sourcePath (Join-Path $sourceDir "templates\customers") -destPath (Join-Path $outputDir "templates\customers")

# Copy and organize asset files
# First, get all JS files
Get-ChildItem -Path (Join-Path $sourceDir "assets") -Filter "*.js" | ForEach-Object {
    $fileName = $_.Name

    # Check if it's a component JS file
    if ($fileName -match "(details-disclosure|details-modal|search-form|animations)\.js") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "assets\js\components")
        Write-Host "Copied $fileName to assets\js\components"
    }
    # Check if it's a utility JS file
    elseif ($fileName -match "(constants|pubsub)\.js") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "assets\js\utils")
        Write-Host "Copied $fileName to assets\js\utils"
    }
    # Otherwise it's a general JS file
    else {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "assets\js")
        Write-Host "Copied $fileName to assets\js"
    }
}

# Now handle CSS files
Get-ChildItem -Path (Join-Path $sourceDir "assets") -Filter "*.css" | ForEach-Object {
    $fileName = $_.Name

    # Check if it's a component CSS file
    if ($fileName -match "(collapsible-content|quick-add|quick-order-list)\.css") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "assets\css\components")
        Write-Host "Copied $fileName to assets\css\components"
    }
    # Check if it's a section CSS file
    elseif ($fileName -match "newsletter-section\.css") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "assets\css\sections")
        Write-Host "Copied $fileName to assets\css\sections"
    }
    # Otherwise it's a general CSS file
    else {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "assets\css")
        Write-Host "Copied $fileName to assets\css"
    }
}

# Copy SVG icons to icons directory
Get-ChildItem -Path (Join-Path $sourceDir "assets") -Filter "icon-*.svg" | ForEach-Object {
    Copy-Item $_.FullName -Destination (Join-Path $outputDir "assets\icons")
    Write-Host "Copied $($_.Name) to assets\icons"
}

# Copy images to images directory
Get-ChildItem -Path (Join-Path $sourceDir "assets") -Filter "*.{png,jpg,jpeg,gif}" | ForEach-Object {
    Copy-Item $_.FullName -Destination (Join-Path $outputDir "assets\images")
    Write-Host "Copied $($_.Name) to assets\images"
}

# Copy other asset files directly to assets
Get-ChildItem -Path (Join-Path $sourceDir "assets") -Exclude "*.js", "*.css", "icon-*.svg", "*.png", "*.jpg", "*.jpeg", "*.gif" | ForEach-Object {
    Copy-Item $_.FullName -Destination (Join-Path $outputDir "assets")
    Write-Host "Copied $($_.Name) to assets"
}

# Copy and organize sections files
Get-ChildItem -Path (Join-Path $sourceDir "sections") -Filter "*.liquid" | ForEach-Object {
    $fileName = $_.Name

    # Check what type of section it is
    if ($fileName -match "^(header|footer)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "sections\global")
        Write-Host "Copied $fileName to sections\global"
    }
    elseif ($fileName -match "^(main-product|product|featured-product)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "sections\product")
        Write-Host "Copied $fileName to sections\product"
    }
    elseif ($fileName -match "^(main-collection|collection)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "sections\collection")
        Write-Host "Copied $fileName to sections\collection"
    }
    elseif ($fileName -match "^(cart|main-cart)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "sections\cart")
        Write-Host "Copied $fileName to sections\cart"
    }
    elseif ($fileName -match "^(main-account|main-login|main-register|main-addresses|main-order)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "sections\customer")
        Write-Host "Copied $fileName to sections\customer"
    }
    elseif ($fileName -match "^(main-blog|main-article|featured-blog)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "sections\blog")
        Write-Host "Copied $fileName to sections\blog"
    }
    elseif ($fileName -match "^(main-search|predictive-search)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "sections\search")
        Write-Host "Copied $fileName to sections\search"
    }
    elseif ($fileName -match "^(main-page|page)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "sections\page")
        Write-Host "Copied $fileName to sections\page"
    }
    elseif ($fileName -match "^(quick-order)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "sections\quick-order")
        Write-Host "Copied $fileName to sections\quick-order"
    }
    else {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "sections\misc")
        Write-Host "Copied $fileName to sections\misc"
    }
}

# Copy JSON section files directly to sections
Get-ChildItem -Path (Join-Path $sourceDir "sections") -Filter "*.json" | ForEach-Object {
    Copy-Item $_.FullName -Destination (Join-Path $outputDir "sections")
    Write-Host "Copied $($_.Name) to sections"
}

# Copy and organize snippets files
Get-ChildItem -Path (Join-Path $sourceDir "snippets") -Filter "*.liquid" | ForEach-Object {
    $fileName = $_.Name

    # Check what type of snippet it is
    if ($fileName -match "^(card|article-card|swatch|loading-spinner|pagination)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "snippets\components")
        Write-Host "Copied $fileName to snippets\components"
    }
    elseif ($fileName -match "^(product|buy-buttons)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "snippets\product")
        Write-Host "Copied $fileName to snippets\product"
    }
    elseif ($fileName -match "^cart") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "snippets\cart")
        Write-Host "Copied $fileName to snippets\cart"
    }
    elseif ($fileName -match "^(meta-tags|price)") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "snippets\utils")
        Write-Host "Copied $fileName to snippets\utils"
    }
    elseif ($fileName -match "^header") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "snippets\header")
        Write-Host "Copied $fileName to snippets\header"
    }
    elseif ($fileName -match "^(country|language)-localization") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "snippets\localization")
        Write-Host "Copied $fileName to snippets\localization"
    }
    elseif ($fileName -match "^icon") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "snippets\icons")
        Write-Host "Copied $fileName to snippets\icons"
    }
    elseif ($fileName -match "^quick-order") {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "snippets\quick-order")
        Write-Host "Copied $fileName to snippets\quick-order"
    }
    else {
        Copy-Item $_.FullName -Destination (Join-Path $outputDir "snippets")
        Write-Host "Copied $fileName to snippets"
    }
}

Write-Host "Development theme setup completed at $outputDir"
Write-Host "You can now use this directory structure for development with webpack"
