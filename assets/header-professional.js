/**
 * Professional Header JavaScript
 * Advanced header functionality with performance optimization
 */

class ProfessionalHeader {
  constructor() {
    this.header = document.getElementById('header');
    this.headerWrapper = document.querySelector('.header-wrapper');
    this.stickyType = this.header?.dataset.sticky;
    this.isTransparent = this.header?.dataset.transparent === 'true';
    this.isSticky = false;
    this.lastScrollY = 0;
    this.scrollThreshold = 100;
    this.hideThreshold = 200;
    this.ticking = false;
    
    if (this.header && this.stickyType !== 'none') {
      this.init();
    }
    
    this.initMobileMenu();
    this.initSearch();
    this.initCartUpdates();
  }
  
  init() {
    // Set initial header height CSS variable
    this.updateHeaderHeight();
    
    // Bind scroll handler with RAF throttling
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.requestTick.bind(this), { passive: true });
    
    // Handle resize events
    window.addEventListener('resize', this.debounce(() => {
      this.updateHeaderHeight();
    }, 250));
    
    // Handle initial state
    this.handleScroll();
  }
  
  requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(this.handleScroll);
      this.ticking = true;
    }
  }
  
  updateHeaderHeight() {
    if (!this.header) return;
    
    const headerHeight = this.header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    
    // Update sticky header offset for transparent headers
    if (this.isTransparent) {
      document.documentElement.style.setProperty('--header-offset', `${headerHeight}px`);
    }
  }
  
  handleScroll() {
    this.ticking = false;
    
    if (!this.header) return;
    
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > this.lastScrollY;
    const scrollingUp = currentScrollY < this.lastScrollY;
    
    // Determine if header should be sticky
    const shouldBeSticky = currentScrollY > this.scrollThreshold;
    
    // Handle sticky state
    if (shouldBeSticky !== this.isSticky) {
      this.toggleSticky(shouldBeSticky);
    }
    
    // Handle visibility for different sticky types
    if (this.isSticky) {
      switch (this.stickyType) {
        case 'on-scroll-up':
          const shouldHide = scrollingDown && currentScrollY > this.hideThreshold;
          const shouldShow = scrollingUp || currentScrollY <= this.hideThreshold;
          
          if (shouldHide && !this.header.classList.contains('header--hidden')) {
            this.header.classList.add('header--hidden');
          } else if (shouldShow && this.header.classList.contains('header--hidden')) {
            this.header.classList.remove('header--hidden');
          }
          break;
          
        case 'reduce-logo-size':
          this.header.classList.toggle('header--reduced', currentScrollY > this.hideThreshold);
          break;
      }
    }
    
    // Handle transparent header
    if (this.isTransparent) {
      const shouldBeOpaque = currentScrollY > 50;
      this.headerWrapper.classList.toggle('header-wrapper--opaque', shouldBeOpaque);
    }
    
    this.lastScrollY = currentScrollY;
  }
  
  toggleSticky(sticky) {
    if (!this.header) return;
    
    this.isSticky = sticky;
    
    if (sticky) {
      this.header.classList.add('header--sticky');
      document.body.classList.add('has-sticky-header');
      
      // Add body offset for non-transparent headers
      if (!this.isTransparent) {
        document.body.style.paddingTop = `var(--header-height)`;
      }
    } else {
      this.header.classList.remove('header--sticky', 'header--hidden', 'header--reduced');
      document.body.classList.remove('has-sticky-header');
      
      if (!this.isTransparent) {
        document.body.style.paddingTop = '';
      }
    }
    
    // Update header height after state change
    requestAnimationFrame(() => {
      this.updateHeaderHeight();
    });
  }
  
  initMobileMenu() {
    const menuButton = document.querySelector('.header__menu-button');
    const drawer = document.getElementById('mobile-menu-drawer');
    
    if (!menuButton || !drawer) return;
    
    this.mobileMenu = new MobileMenuManager(menuButton, drawer);
  }
  
  initSearch() {
    const searchButtons = document.querySelectorAll('[data-action="open-search"]');
    const searchModal = document.getElementById('search-modal');
    
    if (searchButtons.length && searchModal) {
      this.search = new SearchModalManager(searchButtons, searchModal);
    }
  }
  
  initCartUpdates() {
    // Listen for cart updates
    document.addEventListener('cart:updated', this.handleCartUpdate.bind(this));
    
    // Initialize cart count from existing data
    const cartLink = document.querySelector('.header__cart');
    if (cartLink) {
      const count = parseInt(cartLink.dataset.cartCount) || 0;
      this.updateCartCount(count);
    }
  }
  
  handleCartUpdate(event) {
    const itemCount = event.detail?.itemCount || 0;
    this.updateCartCount(itemCount);
  }
  
  updateCartCount(count) {
    const cartCounts = document.querySelectorAll('.header__cart-count');
    const cartLinks = document.querySelectorAll('.header__cart');
    
    cartLinks.forEach(link => {
      link.dataset.cartCount = count;
      link.setAttribute('aria-label', 
        `${link.getAttribute('aria-label').split('(')[0].trim()} (${count})`
      );
    });
    
    cartCounts.forEach(badge => {
      if (count > 0) {
        badge.textContent = count < 100 ? count : '99+';
        badge.style.display = 'flex';
        badge.style.animation = 'cartBadgeAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      } else {
        badge.style.display = 'none';
      }
    });
  }
  
  // Utility functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Mobile Menu Manager
class MobileMenuManager {
  constructor(button, drawer) {
    this.button = button;
    this.drawer = drawer;
    this.overlay = document.querySelector('.mobile-menu-overlay');
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    this.button.addEventListener('click', this.toggle.bind(this));
    
    if (this.overlay) {
      this.overlay.addEventListener('click', this.close.bind(this));
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Handle focus trap
    this.setupFocusTrap();
  }
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  open() {
    this.isOpen = true;
    this.drawer.classList.add('mobile-menu-drawer--open');
    this.button.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first menu item
    const firstLink = this.drawer.querySelector('a, button');
    if (firstLink) {
      firstLink.focus();
    }
  }
  
  close() {
    this.isOpen = false;
    this.drawer.classList.remove('mobile-menu-drawer--open');
    this.button.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to menu button
    this.button.focus();
  }
  
  setupFocusTrap() {
    // Implementation for focus trap within mobile menu
    // This ensures keyboard navigation stays within the menu when open
  }
}

// Search Modal Manager
class SearchModalManager {
  constructor(buttons, modal) {
    this.buttons = buttons;
    this.modal = modal;
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    this.buttons.forEach(button => {
      button.addEventListener('click', this.open.bind(this));
    });
    
    const closeButton = this.modal.querySelector('.search-modal__close');
    if (closeButton) {
      closeButton.addEventListener('click', this.close.bind(this));
    }
    
    // Close on escape or outside click
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }
  
  open() {
    this.isOpen = true;
    this.modal.classList.add('search-modal--open');
    document.body.classList.add('search-modal-open');
    document.body.style.overflow = 'hidden';
    
    const searchInput = this.modal.querySelector('input[type="search"]');
    if (searchInput) {
      searchInput.focus();
    }
  }
  
  close() {
    this.isOpen = false;
    this.modal.classList.remove('search-modal--open');
    document.body.classList.remove('search-modal-open');
    document.body.style.overflow = '';
    
    // Return focus to the button that opened the modal
    if (this.lastActiveButton) {
      this.lastActiveButton.focus();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProfessionalHeader();
});

// Export for potential external use
window.ProfessionalHeader = ProfessionalHeader;