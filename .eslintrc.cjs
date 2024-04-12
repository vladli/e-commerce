module.exports = {
  root: true,
  extends: [
    '@nuxt/eslint-config',
    'plugin:tailwindcss/recommended',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'prettier/prettier': 'off',
    'vue/multi-word-component-names': ['off'],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        externalIgnores: []
      }
    ],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        switchCase: 0,
        ignores: []
      }
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ],
        alphabetical: true
      }
    ]
  }
};
