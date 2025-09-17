# Webpack Build System Quick Reference Guide

This guide provides quick reference for working with the Dawn theme's Webpack build system.

## Available Commands

Run these commands from the project root:

```bash
# Production build - minified and optimized output
npm run build

# Development build - includes source maps for debugging
npm run build:dev

# Watch mode - automatically rebuilds when files change
npm run watch
```

## Build Output

All processed assets are output to the `dist` directory with the following structure:

```
dist/
├── css/
│   ├── base.css
│   ├── components/
│   └── sections/
├── js/
│   ├── base.js
│   ├── components/
│   ├── global.js
│   └── utils/
├── icons/
└── images/
```

## Working With Assets

### JavaScript

- Edit files in `assets/js/` directory
- Organize component code in `assets/js/components/`
- Utility functions should go in `assets/js/utils/`
- Import dependencies where needed (webpack will handle bundling)

```javascript
// Example: assets/js/components/my-component.js
import { formatPrice } from '../utils/currency';

export function MyComponent(element) {
  // Component code here
}
```

### CSS

- Edit files in `assets/css/` directory
- Component styles go in `assets/css/components/`
- Section-specific styles go in `assets/css/sections/`
- Global styles are in `assets/css/base.css`

### Images and Icons

- Store images in `assets/images/`
- Store SVG icons in `assets/icons/`
- Reference them in Liquid using the output path:

```liquid
{{ 'image-name.jpg' | asset_img_url: 'medium' }}
```

## Common Tasks

### Adding a new JavaScript module

1. Create your JS file in `assets/js/components/` or `assets/js/utils/`
2. Import it where needed
3. If it needs to be available globally, import it in `assets/js/global.js`

### Adding a new CSS file

1. Create your CSS file in `assets/css/components/` or `assets/css/sections/`
2. Import it in another CSS file or reference it directly in webpack.config.js

### Debugging in Development Mode

- Use source maps to debug JavaScript in browser dev tools
- CSS will also have source maps enabled in development mode
- Check the browser console for any build errors

### Optimization Tips

1. Use dynamic imports for code splitting larger components:

```javascript
if (document.querySelector('.feature-component')) {
  import('./components/feature-component').then(module => {
    const { initFeature } = module;
    initFeature();
  });
}
```

2. Remove any unused CSS by commenting out sections and running performance tests

3. Use the browser's Coverage tab in DevTools to identify unused JavaScript and CSS

## Troubleshooting

- **Issue**: Changes aren't reflected after building
  - **Solution**: Clear browser cache or use hard reload (Ctrl+Shift+R)

- **Issue**: Build failing with module not found
  - **Solution**: Check import paths and ensure file exists

- **Issue**: Watch mode not detecting changes
  - **Solution**: Check that you're modifying files in the `assets` directory, not `dist`

## Deployment Considerations

Remember that when deploying to Shopify:

1. The build process creates optimized files in the `dist` directory
2. Shopify doesn't support subdirectories in sections/snippets
3. Consider creating a deployment script that:
   - Runs the production build
   - Flattens directories as needed
   - Uploads files to Shopify

For questions or issues with the build system, refer to the webpack configuration file or contact the development team.
