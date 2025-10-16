// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: process.env.NUXT_PUBLIC_NODE_ENV === 'production' ? true : false,

  app: {
    head: {
      meta: [
        { name: 'theme-color', content: '#181818' },
        { name: 'msapplication-TileColor', content: '#181818' },
        { name: 'robots', content: 'index, follow' },
        { name: 'apple-mobile-web-app-title', content: 'Trovam' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicons/site.webmanifest' }
      ],
      script: [
        { src: 'https://cloud.umami.is/script.js', defer: true, 'data-website-id': '182211e5-3bf2-457e-9d2b-a1b7287fa2e4' },
      ]
    }
  },

  runtimeConfig: {
    public: {
      baseUrl: 'https://trovam.com',
      environment: 'preview'
    }
  },

  css: ['~/assets/scss/main.scss'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    ['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_TOKEN }],
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-icon'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/_variables.scss" as *;
            @use "@/assets/scss/_include-media.scss" as *;
            @use "@/assets/scss/mixins" as *;
          `
        }
      }
    }
  },

  nitro: {
    prerender: {
      ignore: [
        '/.netlify/'
      ]
    }
  },

  i18n: {
    defaultLocale: 'ca',
    locales: [
      { code: 'ca', language: 'ca-ES', name: 'Valencià', short: 'VAL', file: 'ca.js' },
      { code: 'es', language: 'es-ES', name: 'Castellano', short: 'CAS', file: 'es.js' },
      { code: 'en', language: 'en', name: 'English', short: 'ENG', file: 'en.js' },
    ],
    lazy: true,
    langDir: 'lang',
    baseUrl: 'https://trovam.com'
  },

  image: {
    provider: 'netlify',
    domains: ['a.storyblok.com']
  },

  compatibilityDate: '2024-07-31',

  experimental: {
    defaults: {
      nuxtLink: {
        prefetch: false
      }
    }
  }
})