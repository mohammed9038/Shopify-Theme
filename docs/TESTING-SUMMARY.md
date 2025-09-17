# Shopify Dawn Theme Testing Suite

## Overview

This document provides a summary of the testing infrastructure implemented for the Shopify Dawn theme.

## Testing Components

1. **Jest Unit Tests**
   - Located in `__tests__` directory
   - Tests JavaScript components in isolation
   - Current coverage: ~25% of cart.js

2. **Theme Check**
   - Static analysis of Liquid templates
   - Validates theme structure and best practices

3. **GitHub Actions Workflow**
   - Automatically runs tests on push to main branch and pull requests
   - Includes both Jest tests and Theme Check

## Available Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all Jest tests |
| `npm test -- <filename>` | Run specific Jest test file |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:all` | Run both Jest tests and Theme Check |
| `npm run theme:check` | Run only Theme Check |
| `./run-tests.bat` | Windows batch file to run all tests |

## Test Files

1. **cart.test.js**
   - Tests for CartRemoveButton component click handling
   - Tests for CartItems quantity validation
   - Tests for input reset functionality

2. **facets.test.js**
   - Tests for FacetFiltersForm toggle functionality

3. **theme.test.js**
   - Basic sanity check for theme functionality

## Current Test Status

All tests are currently passing. The most recent run showed:

```
Test Suites: 3 passed, 3 total
Tests:       7 passed, 7 total
Snapshots:   0 total
```

JavaScript code coverage is approximately 25% for cart.js.

## Next Steps for Testing

1. Increase test coverage for JavaScript components
2. Add tests for:
   - Product variants
   - Cart drawer functionality
   - Search functionality
   - Internationalization features

3. Set up visual regression testing
4. Implement end-to-end tests for critical user flows

## Best Practices

1. Write tests before implementing new features
2. Run test:all before committing changes
3. Use the provided GitHub Action workflow
4. Follow the examples in existing test files when creating new tests
