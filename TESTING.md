# Shopify Theme Testing Guidelines

This document provides detailed guidelines for testing this Shopify theme before deploying to production.

## Development Environment Setup

1. **Install Required Tools:**
   - Node.js (v16+): [Download from nodejs.org](https://nodejs.org/)
   - Shopify CLI: `npm install -g @shopify/cli @shopify/theme`
   - Theme Check: Included in Shopify CLI
   - Git (for version control)
   - Browser DevTools (Chrome, Firefox, Safari, Edge)

2. **VS Code Extensions:**
   - Shopify Liquid
   - ESLint
   - Prettier
   - CSS/SCSS linters

3. **Node.js Testing Setup:**
   - Install dependencies: `npm install`
   - Run tests: `npm test`
   - Run linting: `npm run lint`
   - Fix linting issues: `npm run lint:fix`

## Local Development Testing

1. **Start the Local Development Server:**
   ```bash
   npm run theme:serve -- --store=your-store.myshopify.com
   ```
   Or using Shopify CLI directly:
   ```bash
   shopify theme dev --store=your-store.myshopify.com
   ```

2. **Theme Check:**
   Run this to check for theme errors and best practices:
   ```bash
   npm run theme:check
   ```
   Or using Shopify CLI directly:
   ```bash
   shopify theme check
   ```

3. **JavaScript Unit Tests:**
   Run Jest tests:
   ```bash
   npm test
   ```

4. **Linting:**
   Check JavaScript and CSS for errors:
   ```bash
   npm run lint
   ```

3. **Browser Testing:**
   - Test in Chrome, Firefox, Safari, and Edge
   - Use responsive design mode to test different viewport sizes
   - Test on actual mobile devices when possible

## Functional Testing Checklist

- [ ] **Homepage:**
  - Verify all sections render correctly
  - Test sliders and interactive elements
  - Check mobile responsiveness

- [ ] **Collection Pages:**
  - Test filtering and sorting
  - Verify product cards display correctly
  - Test pagination

- [ ] **Product Pages:**
  - Test variant selectors
  - Verify images load and gallery functions work
  - Test "Add to Cart" functionality
  - Verify price, availability, and product information display

- [ ] **Cart:**
  - Test adding/removing items
  - Test quantity adjustments
  - Verify calculations (subtotal, taxes, discounts)
  - Test checkout flow

- [ ] **Search:**
  - Test search functionality
  - Verify search results display correctly
  - Test search autocomplete (if implemented)

- [ ] **Blog/Articles:**
  - Verify article display
  - Test comments (if enabled)
  - Check share functionality

- [ ] **Customer Accounts:**
  - Test login/registration
  - Verify order history display
  - Test address management

## Performance Testing

1. **Lighthouse Audit:**
   - Run via npm script:
     ```bash
     npm run lighthouse -- https://your-store.myshopify.com
     ```
   - Test categories:
     - Performance
     - Accessibility
     - Best Practices
     - SEO

2. **Page Speed Testing:**
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Use [GTmetrix](https://gtmetrix.com/)
   - Test both mobile and desktop speeds

3. **Asset Optimization:**
   - Verify images are properly sized and compressed
   - Check for render-blocking resources
   - Validate JavaScript and CSS minification

## Accessibility Testing

1. **Automated Tools:**
   - Use Lighthouse accessibility audit
   - Use [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)

2. **Manual Testing:**
   - Test keyboard navigation
   - Test with screen readers
   - Check color contrast
   - Verify form labels and ARIA attributes

## Pre-Deployment Checklist

- [ ] Run final Theme Check (`shopify theme check`)
- [ ] Test checkout process end-to-end
- [ ] Validate form submissions
- [ ] Check all custom scripts and integrations
- [ ] Verify all URLs and links
- [ ] Test all interactive elements
- [ ] Check mobile-specific functionality
- [ ] Verify analytics tracking (if implemented)

## Deployment

1. **Deploy to Development Theme:**
   ```bash
   shopify theme push
   ```

2. **Preview in Theme Editor:**
   - Make any final adjustments
   - Test all customizable sections and settings

3. **Publish Theme:**
   - Through Shopify admin or using CLI
   - Verify after publishing that everything works correctly

## Post-Deployment Monitoring

- Monitor site performance using Shopify analytics
- Check for any JavaScript errors using browser console
- Monitor customer feedback for potential issues

## Regression Testing

After any significant updates:
- Run through the functional testing checklist again
- Verify that previous fixes still work
- Check for unexpected side effects in related features

## Additional Resources

- [Shopify Theme Testing Best Practices](https://shopify.dev/themes/best-practices)
- [Shopify's Dawn Theme Documentation](https://shopify.dev/themes/tools/dawn)
- [Web Accessibility Initiative (WAI) Guidelines](https://www.w3.org/WAI/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Documentation](https://eslint.org/docs/user-guide/)
- [Stylelint Documentation](https://stylelint.io/user-guide/)
