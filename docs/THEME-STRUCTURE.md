# Dawn Theme Structure Reference

This document provides an overview of the Dawn theme's reorganized directory structure, explaining the purpose of each directory and key files.

## Root Directory

```
/dawn
├── assets/           # Source assets (development)
├── dist/            # Compiled assets (production)
├── config/          # Theme settings
├── layout/          # Layout templates
├── locales/         # Translation files
├── sections/        # Theme sections
├── snippets/        # Theme snippets
├── templates/       # Page templates
├── docs/            # Theme documentation
├── __tests__/       # Jest test files
├── .github/         # GitHub workflows and templates
├── webpack.config.js # Webpack configuration
├── package.json     # Project dependencies
└── README.md        # Project overview
```

## Assets Directory (Development Sources)

```
/assets
├── css/             # CSS source files
│   ├── base.css     # Global styles
│   ├── components/  # Component-specific styles
│   └── sections/    # Section-specific styles
├── js/              # JavaScript source files
│   ├── global.js    # Main JavaScript entry point
│   ├── theme-editor.js # Theme editor specific code
│   ├── components/  # Component-specific scripts
│   └── utils/       # Utility functions
├── icons/           # SVG icon files
└── images/          # Image files
```

## Dist Directory (Build Output)

```
/dist
├── css/             # Processed CSS files
│   ├── base.css     # Compiled global styles
│   ├── components/  # Compiled component styles
│   └── sections/    # Compiled section styles
├── js/              # Processed JavaScript files
│   ├── base.js      # Compiled main script
│   ├── global.js    # Compiled global script
│   ├── components/  # Compiled component scripts
│   └── utils/       # Compiled utility scripts
├── icons/           # Copied SVG icons
└── images/          # Processed images
```

## Sections Directory

```
/sections
├── blog/            # Blog-related sections
├── cart/            # Cart-related sections
├── collection/      # Collection-related sections
├── customer/        # Customer account sections
├── global/          # Global sections (header, footer, etc.)
├── misc/            # Miscellaneous sections
├── page/            # Page-specific sections
├── product/         # Product-related sections
├── quick-order/     # Quick order functionality
└── search/          # Search-related sections
```

## Snippets Directory

```
/snippets
├── cart/            # Cart-related snippets
├── components/      # Reusable component snippets
├── header/          # Header-related snippets
├── icons/           # Icon snippets
├── localization/    # Language/currency snippets
├── product/         # Product-related snippets
├── quick-order/     # Quick order snippets
└── utils/           # Utility snippets
```

## Key Configuration Files

- **webpack.config.js**: Configuration for the asset build system
- **package.json**: Project dependencies and build scripts
- **config/settings_schema.json**: Theme settings schema
- **config/settings_data.json**: Default theme settings

## Documentation Files

- **README.md**: Main project documentation
- **CONTRIBUTING.md**: Contribution guidelines
- **docs/WEBPACK-GUIDE.md**: How to use the webpack build system
- **docs/PERFORMANCE-SUMMARY.md**: Performance testing results and recommendations
- **docs/REORGANIZATION-SUMMARY.md**: Summary of the theme reorganization
- **docs/BUILD-PROCESS.md**: Details about the build process

## Important Entry Points

### JavaScript

- **assets/js/global.js**: Main JavaScript entry point
- **assets/js/theme-editor.js**: Theme editor specific functionality

### CSS

- **assets/css/base.css**: Global styles

### Templates

- **layout/theme.liquid**: Main theme layout
- **templates/*.json**: JSON templates for theme sections

## Notes About Shopify Limitations

When deploying to Shopify, note that the platform doesn't support subdirectories in the following locations:

- sections/
- snippets/
- templates/

Our current organization is ideal for development, but for deployment to Shopify, you'll need to either:

1. Flatten these directories, or
2. Implement a deployment process that flattens them automatically

Refer to the docs/PERFORMANCE-SUMMARY.md file for more details on the recommended deployment pipeline.
