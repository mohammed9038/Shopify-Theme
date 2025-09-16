/**
 * Header Component
 * 
 * This module handles all header interactions including:
 * - Search toggle functionality
 * - Mobile menu management
 * - Sticky header behavior
 * - Dropdown menu accessibility
 * - Keyboard navigation support
 * 
 * @author: Copilot
 * @version: 1.0.0
 */

class Header {
  /**
   * Initialize the CustomHeader component
   */
  constructor() {
    // Element selectors
    this.header = document.querySelector('.header');
    this.stickyHeader = document.querySelector('.sticky-header');
    this.searchToggle = document.querySelector('.header-search-toggle');
    this.searchForm = document.querySelector('.header-search-form');
    this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    
    // State variables
    this.lastScrollTop = 0;
    this.scrollThreshold = 50;
    this.isMenuOpen = false;

    // Initialize components
    this.initEvents();
    this.initStickyHeader();
    this.initMobileMenu();
    this.setupAccessibility();
  }

  /**
   * Initialize event listeners
   */
  initEvents() {
    // Setup search toggle functionality
    if (this.searchToggle && this.searchForm) {
      this.searchToggle.addEventListener('click', (event) => {
        event.preventDefault();
        this.toggleSearch();
      });
      
      // Close search when clicking outside
      document.addEventListener('click', (event) => {
        if (this.searchForm && !this.searchForm.hasAttribute('hidden') && 
            !this.searchForm.contains(event.target) && 
            !this.searchToggle.contains(event.target)) {
          this.hideSearch();
        }
      });
      
      // Close search on escape key
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.searchForm && !this.searchForm.hasAttribute('hidden')) {
          this.hideSearch();
          this.searchToggle.focus();
        }
      });
    }
  }
  
  /**
   * Initialize sticky header behavior
   */
  initStickyHeader() {
    if (!this.stickyHeader) return;
    
    window.addEventListener('scroll', () => {
      this.handleStickyHeader();
    });
  }
  
  /**
   * Handle sticky header visibility on scroll
   */
  handleStickyHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > this.scrollThreshold) {
      this.stickyHeader.classList.add('is-sticky');
      
      // Hide on scroll down, show on scroll up
      if (scrollTop > this.lastScrollTop && scrollTop > 200) {
        this.stickyHeader.classList.add('is-hidden');
      } else {
        this.stickyHeader.classList.remove('is-hidden');
      }
    } else {
      this.stickyHeader.classList.remove('is-sticky', 'is-hidden');
    }
    
    this.lastScrollTop = scrollTop;
  }
  
  /**
   * Show the search form
   */
  showSearch() {
    if (!this.searchForm) return;
    
    this.searchForm.removeAttribute('hidden');
    this.searchToggle.setAttribute('aria-expanded', 'true');
    
    // Focus the search input
    const searchInput = this.searchForm.querySelector('input[type="search"]');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
  }
  
  /**
   * Hide the search form
   */
  hideSearch() {
    if (!this.searchForm) return;
    
    this.searchForm.setAttribute('hidden', '');
    this.searchToggle.setAttribute('aria-expanded', 'false');
  }
  
  /**
   * Toggle search form visibility
   */
  toggleSearch() {
    const isHidden = this.searchForm.hasAttribute('hidden');
    if (isHidden) {
      this.showSearch();
    } else {
      this.hideSearch();
    }
  }
  
  /**
   * Initialize mobile menu functionality
   * Creates and manages the mobile navigation drawer
   */
  initMobileMenu() {
    if (!this.mobileMenuToggle) return;
    
    // Setup mobile menu if not already present in DOM
    if (!this.mobileMenu || !this.mobileNavOverlay) {
      this.setupMobileMenu();
    }
    
    this.mobileMenuToggle.addEventListener('click', () => {
      this.showMobileMenu();
    });
    
    // Close mobile menu when clicking on overlay
    if (this.mobileNavOverlay) {
      this.mobileNavOverlay.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }
    
    // Handle Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.mobileMenu && !this.mobileMenu.hasAttribute('hidden')) {
        this.closeMobileMenu();
      }
    });
  }
  
  /**
   * Setup the mobile menu DOM elements
   */
  setupMobileMenu() {
    // Create close button if needed
    if (this.mobileMenu && !this.mobileMenu.querySelector('.mobile-menu-close')) {
      const closeButton = document.createElement('button');
      closeButton.classList.add('mobile-menu-close');
      closeButton.setAttribute('aria-label', 'Close menu');
      closeButton.innerHTML = 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ;
      this.mobileMenu.appendChild(closeButton);
      
      closeButton.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }
    
    // Clone the navigation for mobile
    if (this.mobileMenu && !this.mobileMenu.querySelector('.mobile-menu-nav')) {
      const navClone = document.querySelector('.header-nav');
      if (navClone) {
        const mobileNav = document.createElement('nav');
        mobileNav.classList.add('mobile-menu-nav');
        mobileNav.setAttribute('aria-label', 'Mobile navigation');
        mobileNav.innerHTML = navClone.innerHTML;
        this.mobileMenu.appendChild(mobileNav);
      }
    }
  }
  
  /**
   * Show mobile menu with proper accessibility
   */
  showMobileMenu() {
    if (!this.mobileMenu || !this.mobileNavOverlay) return;
    
    // Show the menu and overlay
    this.mobileMenu.classList.add('active');
    this.mobileMenu.removeAttribute('hidden');
    this.mobileMenu.setAttribute('aria-hidden', 'false');
    
    this.mobileNavOverlay.classList.add('active');
    this.mobileNavOverlay.removeAttribute('hidden');
    
    // Set focus to the first focusable element
    setTimeout(() => {
      const firstFocusable = this.mobileMenu.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 100);
    
    // Prevent body scrolling
    document.body.classList.add('mobile-menu-open');
    
    // Update toggle button state
    this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    this.isMenuOpen = true;
  }
  
  /**
   * Close mobile menu with proper accessibility
   */
  closeMobileMenu() {
    if (!this.mobileMenu || !this.mobileNavOverlay) return;
    
    // Hide the menu and overlay
    this.mobileMenu.classList.remove('active');
    this.mobileMenu.setAttribute('hidden', '');
    this.mobileMenu.setAttribute('aria-hidden', 'true');
    
    this.mobileNavOverlay.classList.remove('active');
    this.mobileNavOverlay.setAttribute('hidden', '');
    
    // Re-enable body scrolling
    document.body.classList.remove('mobile-menu-open');
    
    // Update toggle button state and restore focus
    this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    this.mobileMenuToggle.focus();
    this.isMenuOpen = false;
  }
  
  /**
   * Setup accessibility features for navigation menus
   */
  setupAccessibility() {
    this.setupDropdownMenus();
    this.setupKeyboardNavigation();
  }
  
  /**
   * Setup dropdown menu accessibility features
   */
  setupDropdownMenus() {
    const dropdownLinks = document.querySelectorAll('.header-nav .has-dropdown > a');
    
    dropdownLinks.forEach(link => {
      // Add aria attributes
      const dropdownWrapper = link.parentNode;
      const submenu = dropdownWrapper.querySelector('.dropdown-menu');
      const menuId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;
      
      if (submenu) {
        submenu.id = menuId;
        submenu.setAttribute('aria-hidden', 'true');
        link.setAttribute('aria-controls', menuId);
        link.setAttribute('aria-expanded', 'false');
        
        // Toggle submenu on click
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const isExpanded = link.getAttribute('aria-expanded') === 'true';
          
          // Close all other dropdown menus
          dropdownLinks.forEach(otherLink => {
            if (otherLink !== link && otherLink.getAttribute('aria-expanded') === 'true') {
              otherLink.setAttribute('aria-expanded', 'false');
              const otherSubmenu = document.getElementById(otherLink.getAttribute('aria-controls'));
              if (otherSubmenu) {
                otherSubmenu.setAttribute('aria-hidden', 'true');
                otherSubmenu.classList.remove('active');
              }
            }
          });
          
          // Toggle current dropdown
          link.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
          submenu.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
          
          if (isExpanded) {
            submenu.classList.remove('active');
          } else {
            submenu.classList.add('active');
            
            // Focus first link in submenu
            const firstSubmenuLink = submenu.querySelector('a');
            if (firstSubmenuLink) {
              firstSubmenuLink.focus();
            }
          }
        });
      }
    });
  }
  
  /**
   * Setup keyboard navigation support
   */
  setupKeyboardNavigation() {
    // Handle arrow keys for navigation
    const menuItems = document.querySelectorAll('.header-nav li');
    
    menuItems.forEach(item => {
      const link = item.querySelector('a');
      if (!link) return;
      
      link.addEventListener('keydown', (event) => {
        const parentUl = link.closest('ul');
        const items = Array.from(parentUl.querySelectorAll('li > a'));
        const currentIndex = items.indexOf(link);
        const isDropdownMenu = parentUl.classList.contains('dropdown-menu');
        
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            if (isDropdownMenu || item.classList.contains('has-dropdown')) {
              // If dropdown toggle, open the dropdown
              if (item.classList.contains('has-dropdown')) {
                const isExpanded = link.getAttribute('aria-expanded') === 'true';
                if (!isExpanded) {
                  link.click(); // Open dropdown
                  return;
                }
              }
              // Navigate to next item in dropdown
              const nextItem = items[currentIndex + 1] || items[0];
              nextItem.focus();
            }
            break;
            
          case 'ArrowUp':
            event.preventDefault();
            if (isDropdownMenu) {
              // Navigate to previous item in dropdown
              const prevItem = items[currentIndex - 1] || items[items.length - 1];
              prevItem.focus();
            }
            break;
            
          case 'Escape':
            if (isDropdownMenu) {
              event.preventDefault();
              // Close the dropdown and focus the parent link
              const parentLink = parentUl.closest('.has-dropdown').querySelector('a');
              parentLink.setAttribute('aria-expanded', 'false');
              parentUl.setAttribute('aria-hidden', 'true');
              parentUl.classList.remove('active');
              parentLink.focus();
            }
            break;
        }
      });
    });
  }
}

// Initialize header when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new Header();
});
