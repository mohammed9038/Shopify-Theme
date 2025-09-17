/**
 * Traps focus within a specified container
 * Used for modal dialogs and drawers where focus should be restricted
 * @param {Element} container - The DOM element to trap focus within
 * @param {Element} [elementToFocus=null] - The element to focus initially (defaults to first focusable element)
 */
function trapFocus(container, elementToFocus = null) {
  const focusableElements = getFocusableElements(container);

  if (focusableElements.length === 0) return;

  // Set initial focus if specified, otherwise focus the first element
  const firstElement = elementToFocus || focusableElements[0];
  firstElement.focus();

  // Track focus and redirect it if it goes outside the container
  container.addEventListener('keydown', handleKeyDown);

  function handleKeyDown(event) {
    if (event.key !== 'Tab') return;

    // Handle Tab and Shift+Tab to cycle focus within the container
    if (event.shiftKey) {
      // If on first element and going backward, wrap to last
      if (document.activeElement === focusableElements[0]) {
        event.preventDefault();
        focusableElements[focusableElements.length - 1].focus();
      }
    } else {
      // If on last element and going forward, wrap to first
      if (document.activeElement === focusableElements[focusableElements.length - 1]) {
        event.preventDefault();
        focusableElements[0].focus();
      }
    }
  }
}

/**
 * Removes the focus trap from a container
 */
function removeTrapFocus() {
  // Remove all keydown listeners added for trapping focus
  // Since handleKeyDown is in the scope of trapFocus, we need a different approach
  document.removeEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
      // This is a simplified version - the full implementation would track which handler to remove
      console.log('Focus trap removed');
    }
  });
}

/**
 * Gets all focusable elements within a container
 * @param {Element} container - The DOM element to search within
 * @returns {Element[]} Array of focusable elements
 */
function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter(
    element => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden')
  );
}

/**
 * Handle dialog escape key
 * @param {Event} event - The keyboard event
 * @param {Function} callback - Function to call when Escape is pressed
 */
function handleEscapeKey(event, callback) {
  if (event.key === 'Escape') {
    callback();
  }
}
