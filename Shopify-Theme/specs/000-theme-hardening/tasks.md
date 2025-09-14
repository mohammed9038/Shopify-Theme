# specs/000-theme-hardening/tasks.md

## Q1. Setup & Preparation
- [ ] Backup current live theme (duplicate + download)
- [ ] Create GitHub repo; push current theme
- [ ] Create development branch for hardening work
- [ ] Add README with coding standards (BEM-ish CSS, no inline styles, no DOM-polling where not needed)
- [ ] Install Lighthouse CI locally for quick checks (optional)

## Q2. Create New Sections/Snippets/Assets
- [ ] `sections/announcement-bar.liquid` (schema: text, link, dismissible, page visibility)
- [ ] `sections/mobile-drawer.liquid` (menu picker, nested lists, aria roles)
- [ ] `snippets/quick-view.liquid` (gallery, title, price, variants, qty, ATC)
- [ ] `assets/quick-view.js` (open/close, variant select, Ajax add-to-cart, focus trap)
- [ ] `assets/sticky-header.js` (scroll listener, class toggle, safe overlap)
- [ ] `sections/footer-custom.liquid` (blocks: menus, socials, payments, text)
- [ ] `assets/theme-rtl.css` (logical props, icon flips)
- [ ] `assets/color-palette.css` (CSS variables for colors/typography/spacing)

## Q3. Modify Existing Files
- [ ] `sections/header.liquid` — sticky wrapper, announcement slot, minimized markup
- [ ] `snippets/navigation.liquid` — keyboard navigation, aria attributes
- [ ] `layout/theme.liquid` — load order (critical CSS inline if needed), defer non-critical JS
- [ ] `config/settings_schema.json` — controls for colors, type scale, RTL toggle, feature toggles
- [ ] `assets/base.css` — mobile-first layout, spacing scale, typography tokens
- [ ] `assets/global.js` — init scripts, event delegation, no global leaks

## Q4. Styling Priorities (default)
- **P1:** Typography system (scales/line-height), Color tokens & palettes, Spacing & container widths  
- **P2:** Buttons/forms (hover/active/disabled), Accessibility states (focus/contrast), RTL CSS polish  
- **P3:** Smooth transitions (prefers-reduced-motion), Sticky header elevation/shadow

## Q5. Feature Implementation Details & Acceptance
**Quick View**
- Build `snippets/quick-view.liquid` and `assets/quick-view.js`
- Ajax add-to-cart with feedback; focus trap; Esc to close
- **Accept:** open from collection tile; ATC works; no page navigation; keyboard accessible

**Sticky Header**
- Add sticky class on scroll; prevent layout shift; accommodate announcement bar
- **Accept:** header remains visible; no overlap; CLS stable

**Mobile Navigation Drawer**
- Slide-in panel with nested menu support; swipe/close; aria-labeled
- **Accept:** touch-friendly; keyboard/tabbable; body scroll locked when open

**Announcement Bar**
- Configurable text/link; dismissible (cookie/localStorage)
- **Accept:** respects visibility settings; doesn't shift layout when hidden

**Customizable Footer**
- Blocks for menus, socials, payments; reorder in editor
- **Accept:** flexible layout; no visual regressions on mobile

**Settings Enhancements**
- Add color/typography tokens; RTL toggle; feature toggles
- **Accept:** changes apply instantly; no hardcoded strings

## Q6. Performance Tasks
- [ ] Audit images (sizes, `srcset`, lazy loading)
- [ ] Remove unused CSS/JS; minify and bundle where appropriate
- [ ] Defer non-critical scripts; move listeners to delegation
- [ ] Review app scripts; load only where needed (product/collection)

## Q7. QA & Testing
- [ ] Cross-device matrix (Chrome/Safari/Firefox + iOS/Android)
- [ ] Lighthouse (mobile) Perf ≥ 80; check LCP, CLS, TBT
- [ ] Keyboard nav & screen reader smoke tests
- [ ] A/B test plan for Quick View vs. baseline
- [ ] Merchant walkthrough: verify settings, translations, RTL

## Q8. Documentation
- [ ] Update README (features, settings, RTL usage)
- [ ] Changelog (per commit + release notes)
- [ ] Editor guide (how to configure sections)

## Q9. Deploy & Rollback
- [ ] Publish to a new theme copy; sanity check
- [ ] Monitor analytics & error console
- [ ] If needed, restore previous theme; open issue for fixes