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
    'tailwindcss/no-custom-classname': [
      'warn',
      {
        whitelist: ['pi-.*']
      }
    ],
    'vue/html-indent': ['off'],
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': ['off'],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/script-indent': ['off'],
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
