/**
 * Sticky Header Implementation
 * Professional sticky header with smooth animations and performance optimization
 */

class StickyHeader {
  constructor() {
    this.header = document.getElementById('header');
    this.stickyType = this.header?.dataset.sticky;
    this.isSticky = false;
    this.lastScrollY = 0;
    this.scrollThreshold = 100;
    this.hideThreshold = 200;
    
    if (this.header && this.stickyType !== 'none') {
      this.init();
    }
  }
  
  init() {
    // Set initial header height CSS variable
    this.updateHeaderHeight();
    
    // Listen for scroll events with throttling
    this.handleScroll = this.throttle(this.handleScroll.bind(this), 16);
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    
    // Update header height on resize
    window.addEventListener('resize', this.throttle(() => {
      this.updateHeaderHeight();
    }, 250));
    
    // Handle initial state
    this.handleScroll();
  }
  
  updateHeaderHeight() {
    if (!this.header) return;
    
    const headerHeight = this.header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  }
  
  handleScroll() {
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
    
    // Handle visibility for 'on-scroll-up' type
    if (this.stickyType === 'on-scroll-up' && this.isSticky) {
      const shouldHide = scrollingDown && currentScrollY > this.hideThreshold;
      const shouldShow = scrollingUp || currentScrollY <= this.hideThreshold;
      
      if (shouldHide && !this.header.classList.contains('header--hidden')) {
        this.header.classList.add('header--hidden');
      } else if (shouldShow && this.header.classList.contains('header--hidden')) {
        this.header.classList.remove('header--hidden');
      }
    }
    
    this.lastScrollY = currentScrollY;
  }
  
  toggleSticky(sticky) {
    if (!this.header) return;
    
    this.isSticky = sticky;
    
    if (sticky) {
      this.header.classList.add('header--sticky');
      document.body.classList.add('has-sticky-header');
    } else {
      this.header.classList.remove('header--sticky', 'header--hidden');
      document.body.classList.remove('has-sticky-header');
    }
    
    // Update header height after state change
    requestAnimationFrame(() => {
      this.updateHeaderHeight();
    });
  }
  
  // Throttle function for performance
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Mobile Menu Drawer Handler
class MobileMenuDrawer {
  constructor() {
    this.menuButton = document.querySelector('.header__menu-button');
    this.drawer = document.getElementById('mobile-menu-drawer');
    this.overlay = document.querySelector('.mobile-menu-overlay');
    this.isOpen = false;
    
    if (this.menuButton && this.drawer) {
      this.init();
    }
  }
  
  init() {
    // Menu button click
    this.menuButton.addEventListener('click', this.toggle.bind(this));
    
    // Close on overlay click
    if (this.overlay) {
      this.overlay.addEventListener('click', this.close.bind(this));
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.drawer.contains(e.target) && !this.menuButton.contains(e.target)) {
        this.close();
      }
    });
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
    this.drawer.classList.add('menu-drawer--open');
    this.menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    
    // Focus management
    const firstFocusable = this.drawer.querySelector('a, button');
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.isOpen = false;
    this.drawer.classList.remove('menu-drawer--open');
    this.menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to menu button
    this.menuButton.focus();
  }
}

// Search Modal Handler
class SearchModal {
  constructor() {
    this.searchButton = document.querySelector('.header__search-button');
    this.modal = document.getElementById('search-modal');
    this.closeButton = document.querySelector('.search-modal__close');
    this.searchInput = document.querySelector('.search-modal__input');
    this.isOpen = false;
    
    if (this.searchButton && this.modal) {
      this.init();
    }
  }
  
  init() {
    // Search button click
    this.searchButton.addEventListener('click', this.open.bind(this));
    
    // Close button click
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Close when clicking outside
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
    
    // Focus search input
    if (this.searchInput) {
      this.searchInput.focus();
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.isOpen = false;
    this.modal.classList.remove('search-modal--open');
    document.body.classList.remove('search-modal-open');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to search button
    this.searchButton.focus();
  }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new StickyHeader();
  new MobileMenuDrawer();
  new SearchModal();
});

// Handle cart count updates
document.addEventListener('cart:updated', (event) => {
  const cartCount = document.querySelector('.header__cart-count');
  const itemCount = event.detail.itemCount || 0;
  
  if (cartCount) {
    if (itemCount > 0) {
      cartCount.textContent = itemCount;
      cartCount.style.display = 'flex';
    } else {
      cartCount.style.display = 'none';
    }
  }
});