# Theme Structure Organization Guide

This document outlines the recommended structure for organizing the Dawn theme files to improve maintainability and professionalism.

## Asset Organization

### Current Structure
Assets are currently organized in a flat structure with JS, CSS, images, and icons all in the same directory.

### Recommended Structure

```
assets/
├── css/
│   ├── components/
│   │   ├── component-accordion.css
│   │   ├── component-cart.css
│   │   └── ...
│   ├── sections/
│   │   ├── section-blog-post.css
│   │   ├── section-footer.css
│   │   └── ...
│   └── base.css
├── js/
│   ├── components/
│   │   ├── cart.js
│   │   ├── facets.js
│   │   └── ...
│   ├── utils/
│   │   ├── pubsub.js
│   │   ├── constants.js
│   │   └── ...
│   └── global.js
├── icons/
│   ├── icon-account.svg
│   ├── icon-cart.svg
│   └── ...
└── images/
    ├── email-signup-banner-background.svg
    ├── sparkle.gif
    └── ...
```

### Implementation Notes

1. When moving files, ensure all references in liquid templates are updated
2. Use `{{ 'js/components/cart.js' | asset_url }}` format for referencing
3. Consider using a build process to concatenate and minify assets

## Snippets Organization

### Current Structure
Snippets are organized in a flat structure.

### Recommended Structure

```
snippets/
├── components/
│   ├── card-product.liquid
│   ├── price.liquid
│   └── ...
├── product/
│   ├── product-media.liquid
│   ├── product-variant-options.liquid
│   └── ...
├── cart/
│   ├── cart-drawer.liquid
│   ├── cart-notification.liquid
│   └── ...
└── utils/
    ├── meta-tags.liquid
    ├── pagination.liquid
    └── ...
```

## Sections Organization

### Current Structure
Sections are organized in a flat structure.

### Recommended Structure

```
sections/
├── global/
│   ├── header.liquid
│   ├── footer.liquid
│   └── ...
├── product/
│   ├── main-product.liquid
│   ├── featured-product.liquid
│   └── ...
├── collection/
│   ├── main-collection-banner.liquid
│   ├── featured-collection.liquid
│   └── ...
└── misc/
    ├── newsletter.liquid
    ├── image-banner.liquid
    └── ...
```

## Implementation Strategy

1. Create a development branch
2. Implement structure changes incrementally
3. Test thoroughly after each change
4. Use theme kit commands to push changes to development store
5. Validate with Shopify Theme Check

## Benefits

- Improved code organization and navigation
- Better maintainability for large themes
- Easier onboarding for new developers
- More professional structure following modern standards
