# Testing Shopify Dawn Theme

This document outlines the testing strategy and procedures for the Shopify Dawn theme.

## Prerequisites

Before running tests, ensure you have the following installed:

- Node.js v24.8.0 or later
- npm v10.2.5 or later
- Shopify CLI v3.84.1 or later

## Test Structure

Tests are located in the `__tests__` directory and follow these patterns:

1. **Unit Tests**: Testing individual JavaScript components in isolation
2. **Theme Check Tests**: Static analysis of Liquid templates
3. **End-to-end Tests**: For user flows (future implementation)

## Running Tests

### JavaScript Unit Tests

We use Jest for JavaScript testing. Run all tests with:

```bash
npm test
```

To run a specific test file:

```bash
npm test -- cart.test.js
```

### Current Test Coverage

- Cart Components
  - CartRemoveButton: Tests for click handler
  - CartItems: Tests for form validation and quantity handling
  
- Facets Components
  - FacetFiltersForm: Tests for active facets toggling

### Theme Check Tests

To validate Liquid templates and theme structure:

```bash
shopify theme check
```

## Writing New Tests

### JavaScript Components

1. Create a new test file in the `__tests__` directory with the `.test.js` extension
2. Follow the existing pattern for testing web components:
   - Mock any required globals (PUB_SUB_EVENTS, etc.)
   - Set up the HTML structure needed for testing
   - Test component behavior and interactions

### Example:

```javascript
/**
 * @jest-environment jsdom
 */

describe('MyComponent', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <my-component></my-component>
    `;
  });
  
  test('should behave as expected', () => {
    const component = document.querySelector('my-component');
    // Test assertions here
  });
});
```

## Automated Testing

Tests run automatically:

1. On pre-commit hooks via Husky
2. When opening pull requests
3. During CI/CD pipeline execution

## Future Test Enhancements

- Increase JavaScript test coverage
- Add visual regression tests
- Implement end-to-end tests with Cypress
- Create performance testing benchmarks

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Shopify Theme Check Documentation](https://shopify.dev/themes/tools/theme-check)
