# Copilot Instructions for Shopify Dawn Theme

## Project Overview
- This is a Shopify theme (Dawn) using Liquid templates, JavaScript, and CSS.
- Major directories:
  - `assets/`: JavaScript, CSS, SVGs, and other static assets. JS files implement UI logic (e.g., `cart.js`, `product-form.js`).
  - `sections/`: Liquid files for Shopify "sections" (modular page components).
  - `snippets/`: Reusable Liquid partials (e.g., product cards, icons).
  - `templates/`: Page-level Liquid/JSON templates (e.g., `product.json`, `cart.json`).
  - `layout/`: Main layout files (e.g., `theme.liquid`).
  - `config/`: Theme settings schemas and data.

## Key Patterns & Conventions
- **Section-Driven Architecture:** Each `sections/*.liquid` file is a self-contained component, often paired with related assets (JS/CSS) in `assets/`.
- **Snippets for Reuse:** Use `snippets/` for small, composable UI elements. Reference snippets in sections/templates using `{% render 'snippet-name' %}`.
- **Settings Integration:** Theme settings are defined in `config/settings_schema.json` and accessed in Liquid via the `settings` object.
- **JS Initialization:** Most JS files in `assets/` are loaded globally. Some (e.g., `cart-drawer.js`, `product-form.js`) target specific sections and expect certain DOM structure/classes.
- **Naming:** File and variable names are kebab-case. Liquid objects/variables use snake_case.
- **SVGs:** SVG icons are stored in `assets/` and inlined via Liquid or referenced as assets.

## Developer Workflows
- **No build step required:** Assets are plain JS/CSS; changes are picked up directly.
- **Testing:** No automated test suite is present by default. Manual browser testing is standard.
- **Debugging:** Use browser dev tools. Console logs are common for debugging JS.
- **Customization:** Add new sections/snippets for custom features. Update `settings_schema.json` to expose new settings.
- **Shopify CLI:** For local development, use Shopify CLI (`shopify theme serve`) to preview changes. (CLI not included in repo.)

## Code Standards & Best Practices
- **ALWAYS create backups:** Before making any changes, create a backup copy of the original file (e.g., `file.liquid.backup`) to enable rollback if issues occur.
- **Shopify Best Practices:** Follow Shopify's coding standards and performance guidelines. Use semantic HTML, optimize for Core Web Vitals, and ensure accessibility.
- **Code Quality:** Write clean, maintainable code with proper indentation, meaningful variable names, and inline comments for complex logic.
- **Performance:** Minimize HTTP requests, optimize images, use lazy loading, and avoid blocking JavaScript. Test on mobile devices.
- **Liquid Best Practices:** Use proper escaping (`| escape`), avoid deep nesting, cache expensive operations, and follow Shopify's Liquid style guide.
- **Version Control:** Document changes clearly and test thoroughly before committing. Keep track of what was modified for easy troubleshooting.
- **Backup Repository:** Use https://github.com/mohammed9038/Shopify-Theme.git for version control and backup reference.

## Integration Points
- **Shopify Platform:** Liquid templates and settings integrate with Shopify's backend.
- **External JS/CSS:** You may add third-party scripts/styles in `assets/` and reference them in `theme.liquid`.

## Examples
- To add a new product badge:
  1. Create a snippet (e.g., `snippets/product-badge.liquid`).
  2. Render it in `sections/main-product.liquid` with `{% render 'product-badge', product: product %}`.
  3. Add styles in `assets/component-product-badge.css`.

- To add a new theme setting:
  1. Edit `config/settings_schema.json`.
  2. Access via `settings.new_setting` in Liquid.

## References
- `assets/cart.js`, `sections/cart-drawer.liquid`, `snippets/cart-drawer.liquid`: Cart logic and UI.
- `assets/product-form.js`, `sections/main-product.liquid`: Product form logic.
- `config/settings_schema.json`: Theme settings structure.

---
For more details, see Shopify's [Dawn documentation](https://shopify.dev/docs/themes/os20).
