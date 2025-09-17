// This file contains setup code for Jest tests

// Mock window.Shopify which is available in Shopify theme environment
global.Shopify = {
  locale: 'en',
  currency: {
    active: 'USD',
    rate: '1.0',
  },
  routes: {
    root: '/',
    cart: '/cart',
    products: '/products',
  },
  theme: {
    id: '12345',
    name: 'Dawn',
  },
};

// Mock document.querySelector and other DOM methods
document.body.innerHTML = '<div id="root"></div>';

// Add any other global setup for tests here
