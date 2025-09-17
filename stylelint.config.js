module.exports = {
  extends: [
    'stylelint-config-standard',
    '@shopify/stylelint-plugin'
  ],
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'at-rule-no-unknown': [true, {
      ignoreAtRules: ['include', 'mixin', 'extend', 'if', 'else', 'for', 'each']
    }],
  },
  ignoreFiles: [
    'assets/vendor/**/*.css',
    'node_modules/**/*.css'
  ]
};
