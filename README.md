# Dawn Shopify Theme

This is a customized version of the Dawn theme, Shopify's reference theme built with performance, flexibility, and Online Store 2.0 features in mind.

## Getting Started

### Prerequisites

- [Shopify CLI](https://shopify.dev/themes/tools/cli) installed
- Shopify Partner account and development store
- Node.js (for theme development tools)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/mohammed9038/Shopify-Theme.git
cd Shopify-Theme
```

2. Log in to your Shopify account via CLI:
```bash
shopify login
```

3. Start the development server:
```bash
shopify theme dev --store=your-store.myshopify.com
```

4. Start making changes to the theme.

## Development Workflow

### Testing Your Changes

1. Run Theme Check to validate your code:
```bash
shopify theme check
```

2. Test the theme across different browsers and devices.

3. Use Lighthouse in Chrome DevTools to check performance, accessibility, and SEO.

### Deploying Changes

1. Push your changes to a development theme:
```bash
shopify theme push --theme=your-development-theme-id
```

2. Preview your changes in the Theme Editor.

3. Once satisfied, publish your theme or push it to the production theme.

## Theme Structure

- `assets/` - Contains all CSS, JavaScript, and asset files
- `config/` - Contains theme settings and configuration
- `layout/` - Contains theme layout templates
- `locales/` - Contains translation files
- `sections/` - Contains modular sections that can be customized in the Theme Editor
- `snippets/` - Contains reusable code snippets
- `templates/` - Contains templates for specific page types

## Coding Standards

Please follow our [contribution guidelines](CONTRIBUTING.md) when making changes to this theme.

## Resources

- [Shopify Theme Development](https://shopify.dev/themes)
- [Liquid Documentation](https://shopify.dev/api/liquid)
- [Dawn Theme Documentation](https://shopify.dev/themes/tools/dawn)
- [Theme Check](https://shopify.dev/themes/tools/theme-check)
- [Shopify Polaris Design System](https://polaris.shopify.com/)

## License

This theme is provided as is, without warranty of any kind.