/**
 * Utility functions for Shopify Dawn Theme
 */

/**
 * Get focusable elements within a container
 * @param {HTMLElement} container - Container to get focusable elements from
 * @returns {Array} Array of focusable elements
 */
function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

// Constants
const ON_CHANGE_DEBOUNCE_TIMER = 300;

// PubSub events for communication between components
const PUB_SUB_EVENTS = {
  cartUpdate: "cart-update",
  cartError: "cart-error",
  productAdded: "product-added",
  quantityUpdate: "quantity-update",
  variantChange: "variant-change",
  cartDrawerOpen: "cart-drawer-open",
  optionValueSelectionChange: "option-value-selection-change",
};

// Subscribers for PubSub events
const subscribers = {};

/**
 * Subscribe to an event
 * @param {string} event - Event name
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
function subscribe(event, callback) {
  if (!subscribers[event]) {
    subscribers[event] = [];
  }
  subscribers[event].push(callback);

  return function unsubscribe() {
    subscribers[event] = subscribers[event].filter((cb) => cb !== callback);
  };
}

/**
 * Publish an event
 * @param {string} event - Event name
 * @param {any} data - Event data
 */
function publish(event, data) {
  if (!subscribers[event]) return;

  subscribers[event].forEach((callback) => {
    callback(data);
  });
}

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} fn - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(fn, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} fn - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(fn, limit) {
  let inThrottle;
  return function throttledFunction(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Trap focus within a container
 * @param {HTMLElement} container - Container to trap focus in
 */
function trapFocus(container) {
  const focusableElements = getFocusableElements(container);
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (firstFocusableElement) firstFocusableElement.focus();

  container.addEventListener("keydown", (e) => {
    if (e.code !== "Tab") return;

    // If Shift + Tab
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    }
    // If Tab
    else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
}

/**
 * Remove trap focus from a container
 * @param {HTMLElement} container - Container to remove trap focus from
 */
function removeTrapFocus(container) {
  container.removeEventListener("keydown", trapFocus);
}

/**
 * Handle Escape key press
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Function} callback - Callback to execute when Escape is pressed
 */
function onKeyUpEscape(event, callback) {
  if (event.code === "Escape") {
    callback();
  }
}

/**
 * Fetch configuration for Shopify Ajax API calls
 * @param {string} type - Request type ('json' or 'text')
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @returns {Object} Fetch configuration object
 */
function fetchConfig(type = "json", method = "POST") {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: `application/${type}`,
    },
  };
}

// Export all functions and constants
window.debounce = debounce;
window.throttle = throttle;
window.trapFocus = trapFocus;
window.removeTrapFocus = removeTrapFocus;
window.onKeyUpEscape = onKeyUpEscape;
window.fetchConfig = fetchConfig;
window.PUB_SUB_EVENTS = PUB_SUB_EVENTS;
window.ON_CHANGE_DEBOUNCE_TIMER = ON_CHANGE_DEBOUNCE_TIMER;
window.publish = publish;
window.subscribe = subscribe;
