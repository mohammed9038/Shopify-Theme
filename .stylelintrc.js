module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "selector-class-pattern": null, // Allow BEM-style class names with double underscores and double hyphens
    "keyframes-name-pattern": null, // Allow custom keyframe animation names
    "selector-pseudo-element-colon-notation": null, // Allow single colon notation for pseudo-elements
    "selector-not-notation": null, // Allow simple :not() notation
    "media-feature-range-notation": null, // Allow legacy media feature range notation
    "declaration-block-no-redundant-longhand-properties": null, // Allow longhand properties for clarity
    "property-no-vendor-prefix": null, // Allow vendor prefixes for better browser support
    "color-function-notation": null, // Allow any color function notation (rgb, rgba)
    "color-function-alias-notation": null, // Allow rgba function notation (instead of forcing rgb)
    "color-hex-length": null, // Allow both short and long hex color codes
    "shorthand-property-no-redundant-values": null, // Allow redundant values in shorthand properties
    "declaration-property-value-keyword-no-deprecated": null, // Allow deprecated keywords for backwards compatibility
    "value-keyword-case": null, // Allow mixed case keywords for better readability
    "property-no-deprecated": null, // Allow deprecated properties for backwards compatibility
    "length-zero-no-unit": null, // Allow units for zero values
    "declaration-block-no-shorthand-property-overrides": null, // Allow shorthand property overrides
    "declaration-empty-line-before": null, // Allow no empty lines before declarations
    "rule-empty-line-before": null, // Allow no empty lines before rules
    "at-rule-empty-line-before": null, // Allow no empty lines before at-rules
    "custom-property-pattern": null, // Allow custom property names with any pattern
    "no-duplicate-selectors": null, // Allow duplicate selectors in different contexts
    "comment-empty-line-before": null, // Allow comments without empty lines before them
    "comment-whitespace-inside": null, // Allow comments without whitespace inside
    "alpha-value-notation": null, // Allow both percentage and number notations for alpha values
    "font-family-no-missing-generic-family-keyword": null, // Allow font families without generic fallbacks
    "font-family-name-quotes": null, // Allow font family names without quotes
    "declaration-block-single-line-max-declarations": null, // Allow multiple declarations in a single line
    "function-url-quotes": null, // Allow URL functions without quotes
    "keyframe-block-no-duplicate-selectors": null, // Allow duplicate selectors in keyframes
    "declaration-block-no-duplicate-properties": null, // Allow duplicate properties for fallbacks
    "block-no-empty": null, // Allow empty blocks
    "media-type-no-deprecated": null, // Allow deprecated media types
    "declaration-property-value-no-unknown": null, // Allow unknown values for properties
    "selector-id-pattern": null, // Allow any ID selector patterns
    "custom-property-empty-line-before": null, // Allow custom properties without empty lines before them
  },
};
