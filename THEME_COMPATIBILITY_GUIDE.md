# Shopify Theme Settings Compatibility Guide

## Overview
This document provides comprehensive instructions for ensuring any code changes remain compatible with Shopify theme settings. Following these guidelines will maintain the theme's customization capabilities and prevent breaking the theme customizer interface.

## Table of Contents
1. [General Principles](#general-principles)
2. [Section Schema Compatibility](#section-schema-compatibility)
3. [Global Settings Compatibility](#global-settings-compatibility)
4. [Liquid Code Best Practices](#liquid-code-best-practices)
5. [CSS and JavaScript Considerations](#css-and-javascript-considerations)
6. [Testing Checklist](#testing-checklist)
7. [Common Pitfalls to Avoid](#common-pitfalls-to-avoid)

## General Principles

### 1. Always Reference Settings, Never Hardcode Values
**❌ Bad:**
```liquid
<div style="background-color: #ff0000;">
```

**✅ Good:**
```liquid
<div style="background-color: {{ section.settings.background_color | default: '#ff0000' }};">
```

### 2. Maintain Backward Compatibility
- Never remove existing settings without deprecation
- Always provide default values for new settings
- Use conditional logic to handle missing settings

### 3. Follow Shopify Naming Conventions
- Use descriptive, snake_case IDs for settings
- Group related settings logically
- Use consistent label and help text patterns

## Section Schema Compatibility

### Required Schema Structure
Every section file must maintain its `{% schema %}` block:

```liquid
{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "section",
  "settings": [
    // Settings array
  ],
  "blocks": [
    // Blocks array (if applicable)
  ],
  "presets": [
    // Presets array
  ]
}
{% endschema %}
```

### Adding New Settings
When adding new settings, follow this structure:

```json
{
  "type": "text|textarea|richtext|checkbox|radio|select|range|color|color_scheme|image_picker|video|url|blog|collection|product|font_picker|header|paragraph|liquid",
  "id": "unique_setting_id",
  "label": "User-friendly label",
  "default": "default_value",
  "info": "Optional help text",
  "placeholder": "Optional placeholder"
}
```

### Common Setting Types and Usage

#### Color Settings
```json
{
  "type": "color",
  "id": "text_color",
  "label": "Text Color",
  "default": "#000000"
}
```

Usage in Liquid:
```liquid
<div style="color: {{ section.settings.text_color }};">
```

#### Color Scheme Settings
```json
{
  "type": "color_scheme",
  "id": "color_scheme",
  "label": "Color scheme",
  "default": "scheme-1"
}
```

Usage in Liquid:
```liquid
<div class="color-{{ section.settings.color_scheme }}">
```

#### Image Settings
```json
{
  "type": "image_picker",
  "id": "background_image",
  "label": "Background Image"
}
```

Usage in Liquid:
```liquid
{% if section.settings.background_image %}
  <img src="{{ section.settings.background_image | image_url: width: 1920 }}" alt="{{ section.settings.background_image.alt }}">
{% endif %}
```

#### Range Settings
```json
{
  "type": "range",
  "id": "padding_top",
  "min": 0,
  "max": 100,
  "step": 4,
  "unit": "px",
  "label": "Padding top",
  "default": 36
}
```

Usage in Liquid:
```liquid
<div style="padding-top: {{ section.settings.padding_top }}px;">
```

### Block Schema for Repeatable Content
```json
"blocks": [
  {
    "type": "heading",
    "name": "Heading",
    "settings": [
      {
        "type": "inline_richtext",
        "id": "heading",
        "default": "Heading",
        "label": "Heading"
      }
    ]
  }
]
```

## Global Settings Compatibility

### Accessing Global Settings
Global settings from `config/settings_schema.json` are available via `settings` object:

```liquid
{{ settings.logo_width }}
{{ settings.colors_accent_1 }}
{{ settings.type_header_font }}
```

### Common Global Settings to Reference
- **Typography:** `settings.type_header_font`, `settings.type_body_font`
- **Colors:** `settings.colors_accent_1`, `settings.colors_accent_2`
- **Layout:** `settings.page_width`, `settings.spacing_sections`
- **Logo:** `settings.logo`, `settings.logo_width`

### Adding New Global Settings
Add to `config/settings_schema.json`:

```json
{
  "name": "Custom Section",
  "settings": [
    {
      "type": "header",
      "content": "Custom Settings"
    },
    {
      "type": "checkbox",
      "id": "enable_custom_feature",
      "label": "Enable custom feature",
      "default": false
    }
  ]
}
```

## Liquid Code Best Practices

### 1. Use Conditional Logic for Settings
```liquid
{% if section.settings.show_vendor %}
  <p class="product-vendor">{{ product.vendor }}</p>
{% endif %}
```

### 2. Provide Fallbacks for Optional Settings
```liquid
{% assign heading = section.settings.heading | default: 'Default Heading' %}
<h2>{{ heading }}</h2>
```

### 3. Handle Empty Settings Gracefully
```liquid
{% unless section.settings.description == blank %}
  <div class="description">{{ section.settings.description }}</div>
{% endunless %}
```

### 4. Use Settings for Dynamic Classes
```liquid
<div class="section-{{ section.id }} color-{{ section.settings.color_scheme }} {% if section.settings.full_width %}full-width{% endif %}">
```

### 5. Respect Spacing Settings
```liquid
{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top }}px;
    padding-bottom: {{ section.settings.padding_bottom }}px;
  }
{%- endstyle -%}
```

## CSS and JavaScript Considerations

### 1. Use CSS Custom Properties for Settings
```css
:root {
  --color-accent: {{ settings.colors_accent_1 }};
  --font-body: {{ settings.type_body_font.family }};
}
```

### 2. Responsive Design with Settings
```css
.container {
  max-width: {{ settings.page_width }}px;
  padding: 0 {{ settings.spacing_grid_horizontal }}px;
}
```

### 3. JavaScript Settings Integration
```liquid
<script>
  window.themeSettings = {
    cartType: '{{ settings.cart_type }}',
    enableQuickAdd: {{ settings.enable_quick_add | json }},
    moneyFormat: {{ shop.money_format | json }}
  };
</script>
```

## Testing Checklist

### Before Submitting Changes
- [ ] **Theme Customizer Test:** Verify all settings appear and function correctly
- [ ] **Default Values:** Ensure sensible defaults for all new settings
- [ ] **Mobile Responsive:** Test settings on mobile devices
- [ ] **Performance:** Check that settings don't negatively impact load times
- [ ] **Accessibility:** Verify color contrasts and accessibility features
- [ ] **Browser Compatibility:** Test in multiple browsers
- [ ] **Edge Cases:** Test with empty/null setting values

### Testing Process
1. **Open Theme Customizer** (`/admin/themes/current/editor`)
2. **Navigate to each section** with your changes
3. **Test all setting combinations** including edge cases
4. **Preview on different devices** using the preview options
5. **Check console for errors** in browser developer tools
6. **Validate HTML output** for semantic correctness

## Common Pitfalls to Avoid

### 1. ❌ Breaking Existing Settings
```liquid
<!-- Don't remove or rename existing setting IDs -->
<!-- Old: section.settings.button_color -->
<!-- New: section.settings.btn_color  -->
```

### 2. ❌ Hardcoding Values
```liquid
<!-- Don't hardcode colors, fonts, or dimensions -->
<div style="color: red; font-size: 16px;">
```

### 3. ❌ Missing Default Values
```json
{
  "type": "text",
  "id": "heading"
  // Missing: "default": "Default Heading"
}
```

### 4. ❌ Ignoring Mobile Settings
```liquid
<!-- Don't forget mobile-specific settings -->
{% if section.settings.mobile_layout != section.settings.desktop_layout %}
  <!-- Handle mobile layout differences -->
{% endif %}
```

### 5. ❌ Invalid Schema JSON
```json
{
  "type": "text",
  "id": "heading",
  "label": "Heading",
  // Trailing comma will break the schema
}
```

### 6. ❌ Not Using Liquid Filters
```liquid
<!-- Don't output raw user input -->
{{ section.settings.heading }}

<!-- Do sanitize and format -->
{{ section.settings.heading | escape }}
```

## Advanced Patterns

### Conditional Settings
```json
{
  "type": "checkbox",
  "id": "show_advanced_options",
  "label": "Show advanced options",
  "default": false
},
{
  "type": "text",
  "id": "advanced_setting",
  "label": "Advanced setting",
  "info": "Only visible when advanced options are enabled"
}
```

### Setting Groups
```json
{
  "type": "header",
  "content": "Layout Settings"
},
{
  "type": "select",
  "id": "layout_style",
  "options": [
    {"value": "grid", "label": "Grid"},
    {"value": "list", "label": "List"}
  ],
  "default": "grid",
  "label": "Layout style"
}
```

### Dynamic Sections
```liquid
{% for block in section.blocks %}
  {% case block.type %}
    {% when 'heading' %}
      <h2>{{ block.settings.heading }}</h2>
    {% when 'text' %}
      <p>{{ block.settings.text }}</p>
  {% endcase %}
{% endfor %}
```

## Migration Guide

### When Updating Existing Settings
1. **Deprecation Period:** Keep old settings for at least one version
2. **Migration Logic:** Add code to handle both old and new settings
3. **Documentation:** Update this guide with migration notes

```liquid
{% comment %} Handle legacy setting migration {% endcomment %}
{% assign button_style = section.settings.button_style | default: section.settings.legacy_button_style | default: 'primary' %}
```

## Resources

- [Shopify Section Settings Reference](https://shopify.dev/docs/themes/architecture/sections/section-schema)
- [Shopify Theme Settings Reference](https://shopify.dev/docs/themes/architecture/config/settings-schema)
- [Liquid Template Language](https://shopify.dev/docs/api/liquid)
- [Theme Inspector](https://shopify.dev/docs/themes/tools/theme-inspector)

## Version History

- **v1.0:** Initial compatibility guide creation
- Add version notes here when making updates

---

**Remember:** Always test thoroughly in the theme customizer before deploying changes. Settings compatibility is crucial for maintaining a professional, user-friendly theme experience.