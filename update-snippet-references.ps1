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

# Get all liquid files
$liquidFiles = Get-ChildItem -Path $rootPath -Filter "*.liquid" -Recurse

foreach ($file in $liquidFiles) {
  $content = Get-Content -Path $file.FullName -Raw
  $modified = $false

  foreach ($mapping in $snippetMappings.GetEnumerator()) {
    $oldSnippet = "{% render '" + $mapping.Key + "'"
    $newSnippet = "{% render '" + $mapping.Value + "'"

    if ($content -match [regex]::Escape($oldSnippet)) {
      $content = $content.Replace($oldSnippet, $newSnippet)
      $modified = $true
      Write-Host "Updated reference to $($mapping.Key) in $($file.FullName)"
    }
  }

  if ($modified) {
    Set-Content -Path $file.FullName -Value $content
    Write-Host "Updated $($file.FullName)" -ForegroundColor Green
  }
}

Write-Host "Snippet reference update complete!" -ForegroundColor Green
