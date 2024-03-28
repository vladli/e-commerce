// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "My Nuxt App",
    },
  },
  css: ["~/assets/css/tailwind.css"],
  modules: [
    "@nuxt/image",
    "nuxt-primevue",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/color-mode",
  ],
  colorMode: {
    classSuffix: "",
  },
  primevue: {
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    options: {
      unstyled: true,
      ripple: true,
    },
    importPT: { from: path.resolve(__dirname, "./presets/lara/") },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
