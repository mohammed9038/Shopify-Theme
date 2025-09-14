# specs/000-theme-hardening/plan.md

## Overview
Implement improvements using Dawn's **Online Store 2.0 JSON templates** and **Liquid**, with minimal **Ajax API** for Quick View. Keep customizations modular to ease future Dawn merges.

## Theme Modifications
- **Header:** structure, styling, responsiveness; sticky behavior
- **Navigation:** desktop menus and mobile drawer UX
- **Theme settings schema:** colors, typography, RTL, component toggles

## Affected Files / Templates
- `sections/header.liquid`
- `snippets/navigation.liquid` (or Dawn's equivalent)
- `layout/theme.liquid`
- `config/settings_schema.json`
- `assets/base.css`
- `assets/global.js`

## New Components / Sections
- `sections/announcement-bar.liquid`
- `sections/mobile-drawer.liquid`
- `snippets/quick-view.liquid`
- `assets/quick-view.js`
- `assets/sticky-header.js`
- `sections/footer-custom.liquid`
- `assets/theme-rtl.css`
- `assets/color-palette.css` (design tokens)

## Shopify APIs / Structures
- Liquid + JSON templates as primary
- Minimal Ajax API for add-to-cart in Quick View
- Avoid Storefront API for simplicity/compatibility

## Responsiveness (Mobile vs Desktop)
- Mobile-first CSS; adaptive layouts with optimized breakpoints
- Touch-friendly targets and gestures
- Sticky header safe-area/padding handling
- RTL mirroring for paddings/margins/icons

## Localization / Multi-language
- Integrate **Google Translator**; avoid hardcoded strings
- Ensure DOM is friendly to auto-translate
- Provide **RTL toggle** in settings; load `theme-rtl.css` conditionally

## Testing Approach
- Preview store for QA
- Lighthouse speed tests (mobile + desktop)
- A/B testing for key changes (nav/quick view)
- Cross-device testing (iOS/Android/desktop/tablet)
- Manual merchant walkthrough for editor settings

## Performance Considerations
- Image optimization (sizes/srcset), lazy loading
- Minified CSS/JS; defer non-critical scripts
- Reduce DOM size and unused Liquid/JS
- Audit app scripts; load conditionally

## Compatibility with Future Dawn Updates
- Regularly **merge Dawn updates**
- Keep custom code in isolated sections/snippets/assets
- Use Git to track and resolve diffs

## Rollback / Recovery Plan
- Keep downloadable theme backups
- GitHub versioning for all changes
- Restore previous published theme if needed