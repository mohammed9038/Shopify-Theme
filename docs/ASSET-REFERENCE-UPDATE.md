# Asset Reference Update Guide

This guide outlines how to update asset references in Shopify liquid files after reorganizing the assets directory.

## Directory Changes Summary

### JavaScript Files
- Core utility files moved to `assets/js/utils/`
  - `constants.js` → `js/utils/constants.js`
  - `pubsub.js` → `js/utils/pubsub.js`

- Main JavaScript files moved to `assets/js/`
  - `global.js` → `js/global.js`
  - `theme-editor.js` → `js/theme-editor.js`

- Component JavaScript files moved to `assets/js/components/`
  - All other JS files moved to this directory

### CSS Files
- Main CSS files moved to `assets/css/`
  - `base.css` → `css/base.css`
  - Other non-component CSS files moved here

- Component CSS files moved to `assets/css/components/`
  - Files starting with `component-` moved here

- Section CSS files moved to `assets/css/sections/`
  - Files starting with `section-` moved here

### Images and Icons
- SVG icons moved to `assets/icons/`
  - Files starting with `icon-` moved here

- Other images moved to `assets/images/`
  - All other image files moved here

## Required Updates

### Liquid Templates

Find and replace all asset references using these patterns:

1. JavaScript files:
   ```liquid
   {{ 'constants.js' | asset_url }}
   ```
   should be changed to:
   ```liquid
   {{ 'js/utils/constants.js' | asset_url }}
   ```

2. CSS files:
   ```liquid
   {{ 'component-card.css' | asset_url }}
   ```
   should be changed to:
   ```liquid
   {{ 'css/components/component-card.css' | asset_url }}
   ```

3. Icon files:
   ```liquid
   {{ 'icon-cart.svg' | asset_url }}
   ```
   should be changed to:
   ```liquid
   {{ 'icons/icon-cart.svg' | asset_url }}
   ```

4. Image files:
   ```liquid
   {{ 'email-signup-banner-background.svg' | asset_url }}
   ```
   should be changed to:
   ```liquid
   {{ 'images/email-signup-banner-background.svg' | asset_url }}
   ```

## Implementation Strategy

1. Create a backup of your theme
2. Use the search functionality in your editor to find all asset references
3. Update references according to the patterns above
4. Test each page thoroughly after making changes

### Common Files to Check

- `layout/theme.liquid`
- `layout/password.liquid`
- All section files that include scripts or styles
- All snippet files that reference assets
