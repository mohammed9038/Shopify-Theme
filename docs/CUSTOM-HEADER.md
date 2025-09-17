# Custom Header Implementation

This document provides an overview of the custom header implementation for the Shopify Dawn theme.

## Features

- **Desktop Header**
  - Top navigation bar with menu links
  - Main bar with logo, search, account, cart, and language selector
  - Optional announcement bar
  
- **Mobile Header**
  - Hamburger menu button
  - Logo
  - Cart button
  
- **Mobile Drawer Menu**
  - Slide-in navigation menu
  - Support for nested menu items (3 levels)
  
- **Cart Drawer**
  - Slide-in cart panel
  - Product details and quantity controls
  - Cart totals and checkout button
  
- **Responsive Design**
  - Different layouts for desktop (990px+) and mobile devices
  - Announcement bar hidden on mobile
  
## Files Structure

- **Sections**
  - `custom-header.liquid`: Main header component with desktop and mobile layouts
  - `custom-header-group.json`: Configuration for header section group
  
- **Snippets**
  - `custom-drawer-menu.liquid`: Mobile navigation drawer
  - `custom-cart-drawer.liquid`: Cart slide-in panel
  - `inline-svg.liquid`: SVG icons for the header components
  
- **Assets**
  - `custom-menu-drawer.css`: Styles for the mobile drawer menu
  - `accessibility-helpers.js`: Focus management for drawers
  
- **Templates**
  - `page.custom-header-test.liquid`: Test page for the custom header
  - `page.custom-header-test.json`: Template configuration for the test page

## Theme Settings

The custom header supports the following settings in the theme editor:

- **Desktop Layout**
  - Top Navigation Menu: Select the menu to display in the top bar
  
- **Announcement Bar**
  - Show announcement bar: Toggle visibility
  - Announcement text: Set the text content
  
- **Language and Currency**
  - Show language selector: Toggle visibility
  
- **Appearance**
  - Show bottom border: Toggle visibility
  - Top bar color scheme: Select color scheme
  - Main bar color scheme: Select color scheme
  - Announcement bar color scheme: Select color scheme

## Implementation Details

### Desktop Header

The desktop header consists of two parts:
1. Top navigation bar with menu links
2. Main bar with logo, search, account, cart, and language selector

The desktop layout is shown for screen sizes 990px and above.

### Mobile Header

The mobile header has a simpler layout with:
1. Hamburger menu button (opens drawer menu)
2. Logo
3. Cart button (opens cart drawer)

The mobile layout is shown for screen sizes below 990px.

### Cart Drawer

The cart drawer is a slide-in panel that appears when clicking the cart icon. It shows:
1. Cart items with quantities
2. Total price
3. Checkout button

### Navigation Drawer

The mobile drawer menu slides in from the left when the hamburger icon is clicked. It supports:
1. Main menu items
2. Submenu items (up to 3 levels deep)
3. Back navigation for submenus

## JavaScript Components

The header uses JavaScript Web Components:
1. `<custom-header>`: Main header component that manages both drawers
2. `<cart-drawer>`: Cart slide-in panel component
3. `<quantity-input>`: Controls for item quantities in the cart

## Accessibility

The header is designed with accessibility in mind:
1. Proper ARIA attributes for interactive elements
2. Keyboard focus management for drawers
3. Screen reader support with proper labels
4. Focus trapping within open drawers

## Testing

You can test the custom header on the custom-header-test page, which provides:
1. Visual confirmation of all components
2. Instructions for testing the responsive behavior
3. Checklist of implemented features

## Customization

To customize the header:
1. Edit `custom-header.liquid` for HTML/CSS changes
2. Update color schemes in theme settings
3. Modify `custom-menu-drawer.css` or `custom-header.liquid` styles for visual changes
