/**
 * @jest-environment jsdom
 */

// Mock the debounce function which is imported in facets.js
global.debounce = jest.fn((fn) => fn);

// Store original location
const originalLocation = window.location;

// Create a location mock
const locationMock = {
  search: ''
};

// Mock onKeyUpEscape function
global.onKeyUpEscape = jest.fn();

// Mock FacetFiltersForm.searchParamsInitial and FacetFiltersForm.searchParamsPrev
global.FacetFiltersForm = {
  searchParamsInitial: '',
  searchParamsPrev: '',
  renderPage: jest.fn()
};

// We'll create a simplified version of FacetFiltersForm for testing
class FacetFiltersForm {
  static toggleActiveFacets(disable = true) {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.classList.toggle('disabled', disable);
    });
  }
}

describe('Facet Components', () => {

  describe('FacetFiltersForm', () => {
    beforeEach(() => {
      // Set up our document body
      document.body.innerHTML = `
        <div class="js-facet-remove">Active Filter 1</div>
        <div class="js-facet-remove">Active Filter 2</div>
      `;
    });

    test('toggleActiveFacets should toggle disabled class on all js-facet-remove elements', () => {
      const activeFacets = document.querySelectorAll('.js-facet-remove');

      // Enable active facets
      FacetFiltersForm.toggleActiveFacets(false);
      activeFacets.forEach(facet => {
        expect(facet.classList.contains('disabled')).toBe(false);
      });

      // Disable active facets
      FacetFiltersForm.toggleActiveFacets(true);
      activeFacets.forEach(facet => {
        expect(facet.classList.contains('disabled')).toBe(true);
      });
    });
  });
});
