param(
  [string]$rootPath = "C:\Shopify\dawn"
)

$snippetMappings = @{
  "article-card"             = "components/article-card"
  "card-collection"          = "components/card-collection"
  "card-product"             = "components/card-product"
  "price"                    = "components/price"
  "quantity-input"           = "components/quantity-input"
  "swatch-input"             = "components/swatch-input"
  "swatch"                   = "components/swatch"
  "buy-buttons"              = "product/buy-buttons"
  "gift-card-recipient-form" = "product/gift-card-recipient-form"
  "product-media-gallery"    = "product/product-media-gallery"
  "product-media-modal"      = "product/product-media-modal"
  "product-media"            = "product/product-media"
  "product-thumbnail"        = "product/product-thumbnail"
  "product-variant-options"  = "product/product-variant-options"
  "product-variant-picker"   = "product/product-variant-picker"
  "cart-drawer"              = "cart/cart-drawer"
  "cart-notification"        = "cart/cart-notification"
  "header-drawer"            = "header/header-drawer"
  "header-dropdown-menu"     = "header/header-dropdown-menu"
  "header-mega-menu"         = "header/header-mega-menu"
  "header-search"            = "header/header-search"
  "country-localization"     = "localization/country-localization"
  "language-localization"    = "localization/language-localization"
  "icon-accordion"           = "icons/icon-accordion"
  "icon-with-text"           = "icons/icon-with-text"
  "social-icons"             = "icons/social-icons"
  "quick-order-list-row"     = "quick-order/quick-order-list-row"
  "quick-order-list"         = "quick-order/quick-order-list"
  "quick-order-product-row"  = "quick-order/quick-order-product-row"
  "facets"                   = "utils/facets"
  "loading-spinner"          = "utils/loading-spinner"
  "meta-tags"                = "utils/meta-tags"
  "pagination"               = "utils/pagination"
  "price-facet"              = "utils/price-facet"
  "progress-bar"             = "utils/progress-bar"
  "share-button"             = "utils/share-button"
  "unit-price"               = "utils/unit-price"
}

function New-SnippetWrapper {
  param(
    [string]$originalName,
    [string]$newPath
  )

  $wrapperPath = Join-Path -Path $rootPath -ChildPath "snippets\$originalName.liquid"

  # Skip if the file already exists
  if (Test-Path $wrapperPath) {
    Write-Host "Wrapper for $originalName already exists at $wrapperPath" -ForegroundColor Yellow
    return
  }

  $wrapperContent = @"
{% comment %}
  Wrapper for the $originalName snippet that has been moved to $newPath directory.
  This file exists for backward compatibility with themes that reference snippets in the root directory.

  Usage: Include this file to automatically redirect to the new location.
{% endcomment %}

{%- render '$newPath' -%}
"@

  Set-Content -Path $wrapperPath -Value $wrapperContent
  Write-Host "Created wrapper for $originalName at $wrapperPath" -ForegroundColor Green
}

# Create snippets directory if it doesn't exist
$snippetsDir = Join-Path -Path $rootPath -ChildPath "snippets"
if (-not (Test-Path $snippetsDir)) {
  New-Item -Path $snippetsDir -ItemType Directory | Out-Null
  Write-Host "Created snippets directory at $snippetsDir" -ForegroundColor Green
}

# Create wrapper files for each mapping
foreach ($mapping in $snippetMappings.GetEnumerator()) {
  New-SnippetWrapper -originalName $mapping.Key -newPath $mapping.Value
}

Write-Host "Snippet wrapper creation complete!" -ForegroundColor Green
