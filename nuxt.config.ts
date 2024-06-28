// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: process.env.NUXT_PUBLIC_NODE_ENV === 'production' ? true : false,

  app: {
    head: {
      meta: [
        { name: 'theme-color', content: '#1e1e1e' },
        { name: 'msapplication-TileColor', content: '#1e1e1e' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'mask-icon', color: '#652B80', href: '/safari-pinned-tab.svg' },
        { rel: 'manifest', color: '#652B80', href: '/site.webmanifest' },
      ],
      script: [
        { id: 'cookieyes', type: 'text/javascript', src: 'https://cdn-cookieyes.com/client_data/803042d9c7c874be402c6381/script.js' },
        { src: 'https://cloud.umami.is/script.js', defer: true, 'data-website-id': '182211e5-3bf2-457e-9d2b-a1b7287fa2e4' },
      ]
    }
  },

  runtimeConfig: {
    public: {
      baseUrl: 'https://firatrovam.com',
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
            @import "@/assets/scss/_variables.scss";
            @import "@/assets/scss/_mixins.scss";
            @import 'node_modules/include-media/dist/_include-media.scss';
          `
        }
      }
    }
  },

  i18n: {
    defaultLocale: 'ca',
    locales: [
      { code: 'ca', iso: 'ca-ES', name: 'Valencià', short: 'VAL', file: 'ca.js' },
      { code: 'es', iso: 'es-ES', name: 'Castellano', short: 'CAS', file: 'es.js' },
      { code: 'en', iso: 'en', name: 'English', short: 'ENG', file: 'en.js' },
    ],
    lazy: true,
    langDir: 'lang',
    baseUrl: 'https://firatrovam.com'
  },

  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://a.storyblok.com'
    }
  }
})
