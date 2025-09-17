# Contributing to Dawn Theme

This document outlines the coding standards and best practices for contributing to the Dawn theme. Following these guidelines ensures consistency and maintainability across the codebase.

## General Guidelines

- **Liquid Syntax**: Follow [Shopify's Liquid coding standards](https://shopify.dev/themes/tools/liquid-code-examples)
- **File Structure**: Maintain the existing file structure and organization
- **Naming Conventions**: Use descriptive names for files, sections, and snippets
- **Comments**: Add comments to explain complex logic or functionality
- **Performance**: Optimize for performance by minimizing HTTP requests and optimizing assets

## CSS/SCSS Guidelines

- Use the BEM (Block Element Modifier) naming methodology
- Maintain the component-based structure in the `assets` folder
- Keep CSS modular and avoid global styles when possible
- Follow this order for CSS properties:
  1. Positioning (position, top, right, z-index, etc.)
  2. Box model (display, width, height, margin, padding)
  3. Typography (font-family, font-size, text-align, etc.)
  4. Visual (color, background, border, etc.)
  5. Miscellaneous (transform, opacity, etc.)

## JavaScript Guidelines

- Use ES6+ syntax when possible
- Use vanilla JavaScript rather than jQuery when adding new functionality
- Follow functional programming principles
- Add event handlers using delegation when appropriate
- Ensure scripts are properly loaded using `defer` attribute

## Liquid Guidelines

- Follow DRY (Don't Repeat Yourself) principles
- Use Shopify section and block structure for customizable components
- Use snippets for reusable components
- Avoid excessive logic in templates
- Use appropriate translation keys with the `t` filter

## Testing Guidelines

- Test changes across multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices and different viewport sizes
- Test all interactive elements and forms
- Validate accessibility using tools like Lighthouse
- Run Theme Check (`shopify theme check`) before submitting changes

## Git Workflow

- Create a new branch for each feature or fix
- Keep commits small and focused
- Write descriptive commit messages
- Reference issue numbers in commit messages when applicable
- Squash commits before merging when appropriate

## Theme Settings

- Add new settings to the appropriate section or create a new section
- Use descriptive labels and helpful tooltips
- Group related settings together
- Use appropriate input types (text, checkbox, select, etc.)

## Accessibility

- Ensure proper color contrast
- Add appropriate ARIA attributes
- Implement keyboard navigation
- Use semantic HTML elements
- Include alt text for images

## Performance

- Optimize images using appropriate formats and compression
- Minify CSS and JavaScript files
- Use lazy loading for images when appropriate
- Implement responsive images using `srcset` and `sizes` attributes
- Avoid excessive use of custom fonts

By following these guidelines, we can maintain a high-quality, consistent codebase that provides an excellent experience for merchants and their customers.