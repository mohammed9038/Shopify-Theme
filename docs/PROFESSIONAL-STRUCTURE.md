# Professional Shopify Theme Structure

This guide outlines best practices for maintaining a professional and maintainable Shopify theme structure.

## Directory Structure

A well-organized Shopify theme should follow this structure:

```
theme/
├── assets/                # Theme assets
│   ├── css/               # CSS files
│   │   ├── components/    # Component-specific styles
│   │   ├── sections/      # Section-specific styles
│   │   └── base.css       # Core styles
│   ├── js/                # JavaScript files
│   │   ├── components/    # Component scripts
│   │   ├── utils/         # Helper functions and utilities
│   │   └── global.js      # Global scripts
│   ├── icons/             # SVG icons
│   └── images/            # Theme images
├── config/                # Theme configuration
│   ├── settings_data.json # Theme settings data
│   └── settings_schema.json # Theme settings schema
├── layout/                # Layout templates
├── locales/               # Translation files
├── sections/              # Theme sections
│   ├── global/            # Global sections (header, footer)
│   ├── product/           # Product-related sections
│   ├── collection/        # Collection-related sections
│   └── misc/              # Miscellaneous sections
├── snippets/              # Reusable code snippets
│   ├── components/        # UI components
│   ├── product/           # Product-related snippets
│   ├── cart/              # Cart-related snippets
│   └── utils/             # Utility snippets
├── templates/             # Page templates
│   └── customers/         # Customer account templates
└── __tests__/             # Test files
```

## Naming Conventions

### Files and Directories
- Use kebab-case for all file and directory names (e.g., `product-card.liquid`)
- Use descriptive names that indicate functionality
- Group related files together

### Variables in Liquid
- Use snake_case for Liquid variables (e.g., `product_card`)
- Use descriptive variable names that indicate purpose
- Prefix boolean variables with `is_` or `has_` (e.g., `is_available`, `has_variants`)

### CSS Classes
- Use BEM (Block Element Modifier) methodology for CSS classes
- Format: `.block__element--modifier`
- Example: `.product-card__image--featured`

### JavaScript
- Use camelCase for JavaScript variables and functions
- Use PascalCase for JavaScript classes
- Prefix private functions with underscore (e.g., `_calculatePrice()`)

## Code Organization

### Liquid Files
- Keep files small and focused on a single responsibility
- Use snippets for reusable components
- Use comments to explain complex logic
- Organize code with consistent indentation (2 spaces)

### CSS
- Organize styles by component
- Use CSS custom properties for theme settings
- Minimize use of `!important`
- Group media queries at the end of components

### JavaScript
- Use modular patterns
- Separate DOM manipulation from business logic
- Use consistent error handling
- Document functions and complex logic with comments

## Best Practices

### Version Control
- Use Git for version control
- Create a `.gitignore` file for development artifacts
- Use meaningful commit messages
- Use branches for new features and bug fixes

### Documentation
- Include a comprehensive README
- Document theme customization options
- Provide setup instructions
- Include comments in complex code sections

### Performance
- Optimize images
- Minimize CSS and JavaScript
- Lazy-load non-critical resources
- Use responsive images with `srcset`

### Testing
- Test across multiple devices and browsers
- Create unit tests for JavaScript functionality
- Use Theme Check for Liquid validation
- Test with different theme settings

### Development Workflow
- Use local development with Shopify CLI
- Implement continuous integration
- Create a staging theme for testing
- Use Shopify's version control for deployments

## Implementation Process

1. **Audit Current Structure**: Evaluate existing files and organization
2. **Create Plan**: Document changes needed for new structure
3. **Backup Current Theme**: Export current theme as backup
4. **Implement Changes**: Reorganize files according to plan
5. **Update References**: Fix all file paths in theme
6. **Test Thoroughly**: Validate all changes on a development store
7. **Document Changes**: Update documentation with new structure
8. **Deploy**: Push changes to production theme

## Tools and Resources

- Shopify CLI: Command-line tool for theme development
- Theme Check: Linter for Liquid templates
- ESLint: JavaScript linter
- Stylelint: CSS linter
- Prettier: Code formatter
- Jest: JavaScript testing framework

## Maintenance

- Regularly update dependencies
- Conduct code reviews
- Maintain consistent coding standards
- Document changes and updates
- Monitor theme performance
