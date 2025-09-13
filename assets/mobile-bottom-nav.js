/**
 * Mobile Bottom Navigation
 * 
 * This file implements the functionality for the mobile bottom navigation component.
 * Features include:
 * - Search modal integration
 * - Active state management
 * - Cart interaction & count updates
 * - Smooth animations on scroll
 * - Ripple effect on clicks
 * 
 * Dawn Theme - Shopify
 */

class MobileBottomNavigation {
  constructor() {
    this.nav = document.querySelector('.mobile-bottom-nav');
    if (!this.nav) return;
    
    this.links = this.nav.querySelectorAll('.mobile-bottom-nav__link');
    this.searchTriggers = this.nav.querySelectorAll('.js-search-modal-trigger');
    this.searchModal = document.getElementById('Search-Modal');
    this.lastScrollTop = 0;
    this.scrollThreshold = 10;
    this.isScrolling = false;
    
    this.init();
  }
  
  init() {
    this.setupSearchTriggers();
    this.setupActiveState();
    this.setupScrollBehavior();
    this.setupRippleEffect();
    this.setupCartUpdates();
  }
  
  setupSearchTriggers() {
    if (this.searchTriggers.length > 0 && this.searchModal) {
      this.searchTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
          const details = this.searchModal.querySelector('details');
          if (details) {
            details.setAttribute('open', '');
            
            // Focus the search input after a brief delay to ensure modal is visible
            setTimeout(() => {
              const searchInput = this.searchModal.querySelector('input[type="search"]');
              if (searchInput) searchInput.focus();
            }, 100);
          }
        });
      });
    }
  }
  
  setupActiveState() {
    const currentUrl = window.location.pathname;
    
    // Handle specific page types
    if (currentUrl === '/' || currentUrl === '/collections/all') {
      this.setActiveLink('home');
    } else if (currentUrl.includes('/cart')) {
      this.setActiveLink('cart');
    } else if (currentUrl.includes('/account') || currentUrl.includes('/login')) {
      this.setActiveLink('account');
    } else if (currentUrl.includes('/collections/')) {
      this.setActiveLink('collection');
    }
    
    // Also check by direct URL comparison
    this.links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href === currentUrl) {
        link.classList.add('mobile-bottom-nav__link--active');
      }
    });
  }
  
  setActiveLink(type) {
    const selector = `.mobile-bottom-nav__item--${type} .mobile-bottom-nav__link`;
    const link = this.nav.querySelector(selector);
    if (link) link.classList.add('mobile-bottom-nav__link--active');
  }
  
  setupScrollBehavior() {
    window.addEventListener('scroll', () => {
      if (!this.isScrolling) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          this.isScrolling = false;
        });
        this.isScrolling = true;
      }
    }, { passive: true });
  }
  
  handleScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only apply hide/show behavior if we've scrolled enough
    if (Math.abs(currentScrollTop - this.lastScrollTop) > this.scrollThreshold) {
      // Scrolling down, hide the navigation
      if (currentScrollTop > this.lastScrollTop && currentScrollTop > 100) {
        this.nav.style.transform = 'translateY(100%)';
      } 
      // Scrolling up, show the navigation
      else {
        this.nav.style.transform = 'translateY(0)';
      }
      
      this.lastScrollTop = currentScrollTop;
    }
  }
  
  setupRippleEffect() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.top = `${y}px`;
        ripple.style.left = `${x}px`;
        
        link.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
  
  setupCartUpdates() {
    // Listen for cart updates to refresh the cart count
    document.addEventListener('cart:updated', (event) => {
      if (event.detail && event.detail.cart) {
        this.updateCartCount(event.detail.cart.item_count || 0);
      }
    });
    
    // Also listen for drawer close to ensure we catch all updates
    document.addEventListener('drawer:close', () => {
      fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
          this.updateCartCount(cart.item_count || 0);
        })
        .catch(error => console.error('Error fetching cart:', error));
    });
  }
  
  updateCartCount(count) {
    const cartItem = this.nav.querySelector('.mobile-bottom-nav__item--cart');
    if (!cartItem) return;
    
    const countBubble = cartItem.querySelector('.cart-count-bubble');
    
    // Remove existing count bubble if count is 0
    if (count === 0 && countBubble) {
      countBubble.remove();
      return;
    }
    
    // Update existing count bubble or create new one
    if (count > 0) {
      if (countBubble) {
        const countSpan = countBubble.querySelector('span[aria-hidden="true"]');
        if (countSpan) countSpan.textContent = count < 100 ? count : '99+';
      } else {
        const newBubble = document.createElement('span');
        newBubble.className = 'cart-count-bubble';
        
        // Create the visible count
        const visibleCount = document.createElement('span');
        visibleCount.setAttribute('aria-hidden', 'true');
        visibleCount.textContent = count < 100 ? count : '99+';
        newBubble.appendChild(visibleCount);
        
        // Create the visually-hidden count
        const hiddenCount = document.createElement('span');
        hiddenCount.className = 'visually-hidden';
        hiddenCount.textContent = count === 1 ? '1 item' : count + ' items';
        newBubble.appendChild(hiddenCount);
        
        const iconWrapper = cartItem.querySelector('.mobile-bottom-nav__icon');
        if (iconWrapper) iconWrapper.appendChild(newBubble);
      }
    }
  }
}

// Initialize when DOM is ready
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    new MobileBottomNavigation();
  });
}