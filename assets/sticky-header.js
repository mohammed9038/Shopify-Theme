/**
 * Sticky Header JavaScript - Dawn Theme
 * 
 * Enhances the sticky header functionality with:
 * - Smooth transitions
 * - Multiple sticky header types (always sticky, reduce logo, hide on scroll)
 * - Mobile optimizations
 * - Accessibility improvements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Add smooth page transitions with header
  const header = document.querySelector('sticky-header');
  
  if (!header) return;
  
  const stickyType = header.getAttribute('data-sticky-type');
  
  // Exit if sticky header is disabled
  if (stickyType === 'none') return;
  
  // Add extra body padding to account for fixed header
  function updateBodyPadding() {
    const headerHeight = document.querySelector('.section-header').offsetHeight;
    if (stickyType !== 'none') {
      document.body.style.paddingTop = `${headerHeight}px`;
    } else {
      document.body.style.paddingTop = '0';
    }
  }
  
  // Update on resize and orientation change
  window.addEventListener('resize', updateBodyPadding);
  window.addEventListener('orientationchange', updateBodyPadding);
  
  // Initialize
  setTimeout(updateBodyPadding, 300);
});