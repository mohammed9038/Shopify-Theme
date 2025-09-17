/**
 * @jest-environment jsdom
 */

// Mock the PUB_SUB_EVENTS constants
global.PUB_SUB_EVENTS = {
  cartUpdate: 'cart-update',
  quantityUpdate: 'quantity-update',
  optionValueSelectionChange: 'option-value-selection-change',
  variantChange: 'variant-change',
  cartError: 'cart-error',
};

// Mock the subscribe and publish functions
global.subscribe = jest.fn(() => jest.fn());
global.publish = jest.fn(() => Promise.resolve());

// Mock the debounce function which is imported in cart.js
global.debounce = jest.fn((fn) => fn);
global.ON_CHANGE_DEBOUNCE_TIMER = 300;

// Load the cart.js file
require('../assets/js/components/cart.js');

describe('Cart Components', () => {

  describe('CartRemoveButton', () => {
    let cartRemoveButton;
    let mockCartItems;

    beforeEach(() => {
      // Set up our document body
      document.body.innerHTML = `
        <cart-items>
          <cart-remove-button data-index="1"></cart-remove-button>
        </cart-items>
      `;

      // Get references to elements
      cartRemoveButton = document.querySelector('cart-remove-button');
      mockCartItems = document.querySelector('cart-items');

      // Mock the updateQuantity method on cart-items
      mockCartItems.updateQuantity = jest.fn();
    });

    test('should call updateQuantity with index 1 and quantity 0 when clicked', () => {
      // Simulate click event
      cartRemoveButton.click();

      // Verify updateQuantity was called correctly
      expect(mockCartItems.updateQuantity).toHaveBeenCalledWith('1', 0, expect.any(Event));
    });
  });

  describe('CartItems', () => {
    let cartItems;

    beforeEach(() => {
      // Set up our document body with a quantity input
      window.quickOrderListStrings = {
        min_error: 'Minimum quantity is [min]',
        max_error: 'Maximum quantity is [max]',
        step_error: 'Quantity must be a multiple of [step]'
      };

      document.body.innerHTML = `
        <cart-items>
          <input
            type="number"
            id="Quantity-1"
            data-index="1"
            min="1"
            max="10"
            step="1"
            value="2"
            name="updates[]"
          >
        </cart-items>
      `;

      cartItems = document.querySelector('cart-items');
    });

    test('resetQuantityInput should reset the input value to its original value', () => {
      const input = document.getElementById('Quantity-1');
      input.value = '5';

      cartItems.resetQuantityInput('1');

      expect(input.value).toBe('2');
    });

    test('validateQuantity should set custom validity message when below minimum', () => {
      const input = document.getElementById('Quantity-1');
      const mockEvent = {
        target: {
          value: '0',
          dataset: { index: '1', min: '1' },
          max: '10',
          step: '1',
          setCustomValidity: jest.fn(),
          reportValidity: jest.fn(),
          select: jest.fn()
        }
      };

      cartItems.resetQuantityInput = jest.fn();
      cartItems.validateQuantity(mockEvent);

      expect(mockEvent.target.setCustomValidity).toHaveBeenCalledWith('Minimum quantity is 1');
      expect(mockEvent.target.reportValidity).toHaveBeenCalled();
      expect(cartItems.resetQuantityInput).toHaveBeenCalledWith('1');
    });

    test('validateQuantity should set custom validity message when above maximum', () => {
      const mockEvent = {
        target: {
          value: '15',
          dataset: { index: '1', min: '1' },
          max: '10',
          step: '1',
          setCustomValidity: jest.fn(),
          reportValidity: jest.fn(),
          select: jest.fn()
        }
      };

      cartItems.resetQuantityInput = jest.fn();
      cartItems.validateQuantity(mockEvent);

      expect(mockEvent.target.setCustomValidity).toHaveBeenCalledWith('Maximum quantity is 10');
      expect(mockEvent.target.reportValidity).toHaveBeenCalled();
      expect(cartItems.resetQuantityInput).toHaveBeenCalledWith('1');
    });
  });
});
