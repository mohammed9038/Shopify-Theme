# Section Directory Reorganization

This document outlines the organization of section files into logical subdirectories.

## Section Categories

1. **Global**: Header, footer, and other global elements
2. **Product**: Product display and related sections
3. **Collection**: Collection display and related sections
4. **Cart**: Shopping cart-related sections
5. **Customer**: Customer account-related sections
6. **Blog**: Blog and article-related sections
7. **Search**: Search-related sections
8. **Page**: Page-specific sections
9. **Quick-Order**: Quick order functionality
10. **Misc**: Miscellaneous sections (image banners, rich text, etc.)

## Section Mapping

| Original Location | New Location | Purpose |
|-------------------|-------------|---------|
| header.liquid | global/header.liquid | Site header |
| footer.liquid | global/footer.liquid | Site footer |
| footer-group.json | global/footer-group.json | Footer group configuration |
| header-group.json | global/header-group.json | Header group configuration |
| announcement-bar.liquid | global/announcement-bar.liquid | Site-wide announcements |
| main-product.liquid | product/main-product.liquid | Main product display |
| featured-product.liquid | product/featured-product.liquid | Featured product display |
| pickup-availability.liquid | product/pickup-availability.liquid | Store pickup availability |
| related-products.liquid | product/related-products.liquid | Related products display |
| main-collection-banner.liquid | collection/main-collection-banner.liquid | Collection banner |
| main-collection-product-grid.liquid | collection/main-collection-product-grid.liquid | Collection product grid |
| featured-collection.liquid | collection/featured-collection.liquid | Featured collection display |
| main-list-collections.liquid | collection/main-list-collections.liquid | Collections list |
| collection-list.liquid | collection/collection-list.liquid | Collection list display |
| cart-drawer.liquid | cart/cart-drawer.liquid | Cart drawer |
| cart-icon-bubble.liquid | cart/cart-icon-bubble.liquid | Cart icon with item count |
| cart-live-region-text.liquid | cart/cart-live-region-text.liquid | Cart accessibility text |
| cart-notification-button.liquid | cart/cart-notification-button.liquid | Cart notification button |
| cart-notification-product.liquid | cart/cart-notification-product.liquid | Cart notification product display |
| main-cart-items.liquid | cart/main-cart-items.liquid | Cart items display |
| main-cart-footer.liquid | cart/main-cart-footer.liquid | Cart footer with totals |
| main-account.liquid | customer/main-account.liquid | Customer account page |
| main-activate-account.liquid | customer/main-activate-account.liquid | Account activation |
| main-addresses.liquid | customer/main-addresses.liquid | Customer addresses |
| main-login.liquid | customer/main-login.liquid | Customer login |
| main-register.liquid | customer/main-register.liquid | Customer registration |
| main-reset-password.liquid | customer/main-reset-password.liquid | Password reset |
| main-order.liquid | customer/main-order.liquid | Order details |
| main-article.liquid | blog/main-article.liquid | Article display |
| main-blog.liquid | blog/main-blog.liquid | Blog listing |
| featured-blog.liquid | blog/featured-blog.liquid | Featured blog posts |
| main-search.liquid | search/main-search.liquid | Search results |
| predictive-search.liquid | search/predictive-search.liquid | Predictive search functionality |
| main-page.liquid | page/main-page.liquid | Page content |
| page.liquid | page/page.liquid | Page template |
| contact-form.liquid | page/contact-form.liquid | Contact form |
| quick-order-list.liquid | quick-order/quick-order-list.liquid | Quick order list |
| bulk-quick-order-list.liquid | quick-order/bulk-quick-order-list.liquid | Bulk quick ordering |
| newsletter.liquid | misc/newsletter.liquid | Newsletter signup |
| image-banner.liquid | misc/image-banner.liquid | Image banner |
| image-with-text.liquid | misc/image-with-text.liquid | Image with text |
| rich-text.liquid | misc/rich-text.liquid | Rich text content |
| slideshow.liquid | misc/slideshow.liquid | Image slideshow |
| video.liquid | misc/video.liquid | Video display |
| multicolumn.liquid | misc/multicolumn.liquid | Multi-column layout |
| multirow.liquid | misc/multirow.liquid | Multi-row layout |
| collage.liquid | misc/collage.liquid | Image collage |
| collapsible-content.liquid | misc/collapsible-content.liquid | Collapsible content |
| custom-liquid.liquid | misc/custom-liquid.liquid | Custom liquid code |
| email-signup-banner.liquid | misc/email-signup-banner.liquid | Email signup banner |
| main-password-footer.liquid | misc/main-password-footer.liquid | Password page footer |
| main-password-header.liquid | misc/main-password-header.liquid | Password page header |
| apps.liquid | misc/apps.liquid | App blocks container |
