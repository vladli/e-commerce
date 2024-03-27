// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "My Nuxt App",
    },
  },
  css: [
    "assets/css/tailwind.css",
    "primevue/resources/themes/aura-light-green/theme.css",
  ],
  modules: ["nuxt-primevue", "@nuxtjs/tailwindcss", "nuxt-icon"],
  primevue: {
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    options: {
      ripple: true,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
