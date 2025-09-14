/**
 * Dawn Theme JavaScript Enhancements
 * 
 * Professional JavaScript enhancements for improved user experience
 * Complements the CSS enhancements with interactive functionality
 * 
 * Features:
 * - Enhanced mobile interactions
 * - Smooth animations and transitions
 * - Performance optimizations
 * - Accessibility improvements
 * - Touch gesture support
 * - Progressive enhancement
 * 
 * @version 1.0.0
 * @compatibility Dawn Theme 15.4.0+
 * @dependencies None (vanilla JS)
 */

(function() {
  'use strict';

  // ===============================================================
  // THEME ENHANCEMENT UTILITIES
  // Core utilities for theme enhancements
  // ===============================================================

  const ThemeEnhancements = {
    
    // Feature detection
    isTouch: 'ontouchstart' in window,
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
    isAndroid: /Android/.test(navigator.userAgent),
    isMobile: window.innerWidth < 750,
    
    // Animation preferences
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    // Theme settings (from Shopify)
    settings: {
      animationsEnabled: document.documentElement.style.getPropertyValue('--animations-enabled') !== 'false'
    },

    /**
     * Initialize all theme enhancements
     */
    init() {
      console.log('🎨 Dawn Theme Enhancements: Initializing...');
      
      this.setupMobileOptimizations();
      this.setupSmoothScrolling();
      this.setupTouchEnhancements();
      this.setupProgressiveEnhancement();
      this.setupAccessibilityEnhancements();
      this.setupPerformanceOptimizations();
      this.setupCartEnhancements();
      this.setupProductEnhancements();
      this.setupNavigationEnhancements();
      this.setupSearchEnhancements();
      
      console.log('✅ Dawn Theme Enhancements: Ready');
    },

    /**
     * Mobile-specific optimizations
     */
    setupMobileOptimizations() {
      if (!this.isMobile) return;

      // iOS viewport fix
      if (this.isIOS) {
        this.fixIOSViewport();
      }

      // Android keyboard handling
      if (this.isAndroid) {
        this.handleAndroidKeyboard();
      }

      // Touch feedback for buttons
      this.addTouchFeedback();
      
      // Mobile navigation improvements
      this.enhanceMobileNavigation();
    },

    /**
     * Fix iOS viewport issues
     */
    fixIOSViewport() {
      // Fix 100vh on iOS
      const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setVH();
      window.addEventListener('resize', setVH);
      window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 200);
      });

      // Prevent zoom on form inputs
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        if (input.style.fontSize === '' || parseFloat(input.style.fontSize) < 16) {
          input.style.fontSize = '16px';
        }
      });
    },

    /**
     * Handle Android keyboard behavior
     */
    handleAndroidKeyboard() {
      let initialViewportHeight = window.innerHeight;
      
      window.addEventListener('resize', () => {
        const currentHeight = window.innerHeight;
        const keyboardHeight = initialViewportHeight - currentHeight;
        
        if (keyboardHeight > 150) {
          document.body.classList.add('keyboard-open');
          document.documentElement.style.setProperty('--keyboard-height', `${keyboardHeight}px`);
        } else {
          document.body.classList.remove('keyboard-open');
          document.documentElement.style.setProperty('--keyboard-height', '0px');
        }
      });
    },

    /**
     * Add haptic touch feedback
     */
    addTouchFeedback() {
      const buttons = document.querySelectorAll('button, .btn, .card-product, a[role="button"]');
      
      buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
          this.style.transform = 'scale(0.98)';
          this.style.transition = 'transform 0.1s ease';
          
          // Haptic feedback if available
          if (navigator.vibrate) {
            navigator.vibrate(1);
          }
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
          this.style.transform = '';
        }, { passive: true });
      });
    },

    /**
     * Enhanced mobile navigation
     */
    enhanceMobileNavigation() {
      const menuToggle = document.querySelector('.header__icon--menu');
      const menuDrawer = document.querySelector('.menu-drawer');
      
      if (!menuToggle || !menuDrawer) return;

      // Smooth drawer animation
      menuToggle.addEventListener('click', () => {
        if (menuDrawer.classList.contains('animate-in')) {
          this.closeDrawerSmooth(menuDrawer);
        } else {
          this.openDrawerSmooth(menuDrawer);
        }
      });

      // Close on swipe
      let startX = 0;
      menuDrawer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      }, { passive: true });

      menuDrawer.addEventListener('touchmove', (e) => {
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        
        if (diffX > 50 && startX < 50) {
          this.closeDrawerSmooth(menuDrawer);
        }
      }, { passive: true });
    },

    /**
     * Open drawer with smooth animation
     */
    openDrawerSmooth(drawer) {
      drawer.style.transform = 'translateX(-100%)';
      drawer.classList.add('animate-in');
      
      requestAnimationFrame(() => {
        drawer.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        drawer.style.transform = 'translateX(0)';
      });
    },

    /**
     * Close drawer with smooth animation
     */
    closeDrawerSmooth(drawer) {
      drawer.style.transform = 'translateX(-100%)';
      
      setTimeout(() => {
        drawer.classList.remove('animate-in');
        drawer.style.transition = '';
        drawer.style.transform = '';
      }, 300);
    },

    /**
     * Setup smooth scrolling
     */
    setupSmoothScrolling() {
      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href === '#') return;
          
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    },

    /**
     * Setup touch enhancements
     */
    setupTouchEnhancements() {
      if (!this.isTouch) return;

      // Improve button touch targets
      const smallButtons = document.querySelectorAll('button, .btn');
      smallButtons.forEach(button => {
        const rect = button.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          button.style.minWidth = '44px';
          button.style.minHeight = '44px';
        }
      });

      // Add touch-specific classes
      document.body.classList.add('touch-device');
    },

    /**
     * Progressive enhancement
     */
    setupProgressiveEnhancement() {
      // Add JS-enabled class
      document.documentElement.classList.add('js-enabled');
      
      // Feature detection classes
      if (this.isTouch) document.documentElement.classList.add('touch-enabled');
      if (this.isMobile) document.documentElement.classList.add('mobile-device');
      if (this.prefersReducedMotion) document.documentElement.classList.add('reduce-motion');
    },

    /**
     * Accessibility enhancements
     */
    setupAccessibilityEnhancements() {
      // Focus management for modal/drawer
      this.setupFocusManagement();
      
      // Keyboard navigation improvements
      this.setupKeyboardNavigation();
      
      // Screen reader announcements
      this.setupScreenReaderAnnouncements();
    },

    /**
     * Setup focus management
     */
    setupFocusManagement() {
      const modals = document.querySelectorAll('.modal, .menu-drawer, .cart-drawer');
      
      modals.forEach(modal => {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
              const isOpen = modal.classList.contains('animate-in') || modal.classList.contains('active');
              
              if (isOpen) {
                this.trapFocus(modal);
              }
            }
          });
        });
        
        observer.observe(modal, { attributes: true });
      });
    },

    /**
     * Trap focus within element
     */
    trapFocus(element) {
      const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });
      
      if (firstFocusable) {
        firstFocusable.focus();
      }
    },

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
      // Escape key to close modals
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const openModal = document.querySelector('.modal.animate-in, .menu-drawer.animate-in, .cart-drawer.active');
          if (openModal) {
            const closeButton = openModal.querySelector('.modal__close, .menu-drawer__close, .cart-drawer__close');
            if (closeButton) {
              closeButton.click();
            }
          }
        }
      });
    },

    /**
     * Setup screen reader announcements
     */
    setupScreenReaderAnnouncements() {
      // Create announcement region
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.id = 'theme-announcer';
      document.body.appendChild(announcer);
      
      this.announcer = announcer;
    },

    /**
     * Announce to screen readers
     */
    announce(message) {
      if (this.announcer) {
        this.announcer.textContent = message;
        setTimeout(() => {
          this.announcer.textContent = '';
        }, 1000);
      }
    },

    /**
     * Performance optimizations
     */
    setupPerformanceOptimizations() {
      // Lazy load images
      this.setupLazyLoading();
      
      // Optimize scroll events
      this.setupScrollOptimization();
      
      // Preload critical resources
      this.setupResourcePreloading();
    },

    /**
     * Setup lazy loading for images
     */
    setupLazyLoading() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    },

    /**
     * Optimize scroll events with throttling
     */
    setupScrollOptimization() {
      let ticking = false;
      
      const updateScrollEffects = () => {
        const scrollY = window.pageYOffset;
        document.documentElement.style.setProperty('--scroll-y', scrollY + 'px');
        ticking = false;
      };
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollEffects);
          ticking = true;
        }
      }, { passive: true });
    },

    /**
     * Preload critical resources
     */
    setupResourcePreloading() {
      // Preload fonts
      const criticalFonts = [
        { family: 'Assistant', weight: '400' },
        { family: 'Assistant', weight: '600' }
      ];
      
      criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = `https://fonts.googleapis.com/css2?family=${font.family}:wght@${font.weight}&display=swap`;
        document.head.appendChild(link);
      });
    },

    /**
     * Cart enhancements
     */
    setupCartEnhancements() {
      // Smooth cart updates
      this.setupSmoothCartUpdates();
      
      // Cart drawer improvements
      this.setupCartDrawerEnhancements();
    },

    /**
     * Smooth cart updates with loading states
     */
    setupSmoothCartUpdates() {
      const cartButtons = document.querySelectorAll('[data-cart-action]');
      
      cartButtons.forEach(button => {
        button.addEventListener('click', () => {
          button.classList.add('loading');
          button.disabled = true;
          
          // Re-enable after update (assuming 1s for cart update)
          setTimeout(() => {
            button.classList.remove('loading');
            button.disabled = false;
          }, 1000);
        });
      });
    },

    /**
     * Cart drawer enhancements
     */
    setupCartDrawerEnhancements() {
      const cartDrawer = document.querySelector('.cart-drawer');
      if (!cartDrawer) return;

      // Smooth quantity updates
      const quantityInputs = cartDrawer.querySelectorAll('.quantity-input');
      quantityInputs.forEach(input => {
        let timeout;
        input.addEventListener('input', () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            this.announce('Cart quantity updated');
          }, 500);
        });
      });
    },

    /**
     * Product page enhancements
     */
    setupProductEnhancements() {
      // Enhanced image gallery
      this.setupProductImageGallery();
      
      // Variant selection improvements
      this.setupVariantSelection();
    },

    /**
     * Enhanced product image gallery
     */
    setupProductImageGallery() {
      const gallery = document.querySelector('.product__media-gallery');
      if (!gallery) return;

      // Touch swipe for mobile
      if (this.isTouch) {
        let startX = 0;
        let startY = 0;
        
        gallery.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        }, { passive: true });
        
        gallery.addEventListener('touchend', (e) => {
          if (!startX || !startY) return;
          
          const endX = e.changedTouches[0].clientX;
          const endY = e.changedTouches[0].clientY;
          const diffX = startX - endX;
          const diffY = startY - endY;
          
          // Only trigger if horizontal swipe is greater than vertical
          if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            const currentImage = gallery.querySelector('.product__media--current');
            const nextImage = diffX > 0 ? 
              currentImage.nextElementSibling : 
              currentImage.previousElementSibling;
            
            if (nextImage) {
              nextImage.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
            }
          }
        }, { passive: true });
      }
    },

    /**
     * Variant selection improvements
     */
    setupVariantSelection() {
      const variantSelectors = document.querySelectorAll('.variant-picker__option input');
      
      variantSelectors.forEach(selector => {
        selector.addEventListener('change', () => {
          const variantName = selector.closest('.variant-picker__option').querySelector('.variant-picker__label').textContent;
          const variantValue = selector.value;
          this.announce(`Selected ${variantName}: ${variantValue}`);
        });
      });
    },

    /**
     * Navigation enhancements
     */
    setupNavigationEnhancements() {
      // Mega menu improvements
      this.setupMegaMenu();
      
      // Mobile menu accordion
      this.setupMobileMenuAccordion();
    },

    /**
     * Mega menu enhancements
     */
    setupMegaMenu() {
      const megaMenus = document.querySelectorAll('.mega-menu');
      
      megaMenus.forEach(menu => {
        const trigger = menu.querySelector('.mega-menu__trigger');
        if (!trigger) return;
        
        // Keyboard navigation
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            trigger.click();
          }
        });
      });
    },

    /**
     * Mobile menu accordion
     */
    setupMobileMenuAccordion() {
      const menuItems = document.querySelectorAll('.menu-drawer__menu-item--submenu');
      
      menuItems.forEach(item => {
        const toggle = item.querySelector('.menu-drawer__submenu-toggle');
        const submenu = item.querySelector('.menu-drawer__submenu');
        
        if (!toggle || !submenu) return;
        
        toggle.addEventListener('click', () => {
          const isExpanded = submenu.style.maxHeight && submenu.style.maxHeight !== '0px';
          
          if (isExpanded) {
            submenu.style.maxHeight = '0px';
            toggle.setAttribute('aria-expanded', 'false');
          } else {
            submenu.style.maxHeight = submenu.scrollHeight + 'px';
            toggle.setAttribute('aria-expanded', 'true');
          }
        });
      });
    },

    /**
     * Search enhancements
     */
    setupSearchEnhancements() {
      // Predictive search improvements
      this.setupPredictiveSearch();
      
      // Search modal enhancements
      this.setupSearchModal();
    },

    /**
     * Predictive search improvements
     */
    setupPredictiveSearch() {
      const searchInputs = document.querySelectorAll('input[type="search"]');
      
      searchInputs.forEach(input => {
        let timeout;
        
        input.addEventListener('input', () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            if (input.value.length > 2) {
              this.announce(`${input.value} search suggestions available`);
            }
          }, 300);
        });
      });
    },

    /**
     * Search modal enhancements
     */
    setupSearchModal() {
      const searchModal = document.querySelector('.search-modal');
      if (!searchModal) return;
      
      const searchInput = searchModal.querySelector('input[type="search"]');
      if (searchInput) {
        // Auto-focus when modal opens
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && 
                searchModal.classList.contains('active')) {
              setTimeout(() => searchInput.focus(), 100);
            }
          });
        });
        
        observer.observe(searchModal, { attributes: true });
      }
    }
  };

  // ===============================================================
  // INITIALIZATION
  // Initialize when DOM is ready
  // ===============================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ThemeEnhancements.init();
    });
  } else {
    ThemeEnhancements.init();
  }

  // Make ThemeEnhancements available globally for other scripts
  window.ThemeEnhancements = ThemeEnhancements;

})();