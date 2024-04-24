// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'E-commerce | vladli.dev',
      titleTemplate: '%s | E-commerce'
    }
  },
  css: ['~/assets/css/tailwind.css', '/node_modules/primeicons/primeicons.css'],
  modules: [
    '@nuxt/image',
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@sidebase/nuxt-auth',
    'nuxt-security'
  ],
  components: [{ path: '~/views', pathPrefix: true }, '~/components'],

  colorMode: {
    classSuffix: ''
  },
  primevue: {
    // cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    options: {
      unstyled: true,
      ripple: true
    },
    importPT: { from: path.resolve(__dirname, './presets/lara/') }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  auth: {
    isEnabled: true,

    provider: {
      type: 'authjs'
    }
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'img-src': false,
        'script-src': false
      }
    }
  }
});
