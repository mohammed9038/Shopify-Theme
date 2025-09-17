# Theme Build Process

This document outlines the build process set up for the Dawn theme using Webpack.

## Overview

The build process optimizes and prepares assets for deployment:

- JavaScript files are transpiled with Babel and minified
- CSS files are processed with PostCSS and minified
- Icons and images are copied to the distribution folder

## Build Commands

- `npm run build` - Production build with full optimization
- `npm run build:dev` - Development build with source maps
- `npm run watch` - Development build with watch mode for changes

## Asset Structure

The build process maintains the organized structure of assets:

```
dist/
├── css/
│   ├── base.css
│   ├── components/
│   │   ├── collapsible-content.css
│   │   ├── quick-add.css
│   │   └── ...
│   └── sections/
│       ├── newsletter-section.css
│       └── ...
├── js/
│   ├── global.js
│   ├── components/
│   │   ├── details-disclosure.js
│   │   ├── details-modal.js
│   │   └── ...
│   └── utils/
│       ├── constants.js
│       ├── pubsub.js
│       └── ...
├── icons/
│   └── ...
└── images/
    └── ...
```

## Benefits

- Reduced file sizes through minification
- Improved browser compatibility with Babel transpilation
- Automatic vendor prefixes with Autoprefixer
- Organized and maintainable asset structure
- Faster page load times

## Future Enhancements

- Image optimization
- SCSS preprocessing
- CSS purging to remove unused styles
- Code splitting for better performance
