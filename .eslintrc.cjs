module.exports = {
  root: true,
  extends: [
    "@nuxt/eslint-config",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
