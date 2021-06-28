export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Association Envol',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Envol a pour but de favoriser les études ou la formation professionnelle par l’attribution de bourses.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/aos.js', mode: 'client' },
    '~/plugins/form-validation.js',
    '~/plugins/form-labels.js',
    '~/plugins/getContent.js',
    {
      src: '~/plugins/v-waypoint.js',
      mode: 'client',
    },
  ],
  env: {
    STRIPE_KEY: process.env.STRIPE_KEY,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    PAYPAL_KEY: process.env.PAYPAL_KEY,
    PAYPAL_SECRET: process.env.PAYPAL_SECRET,
    PAYPAL_URL: process.env.PAYPAL_URL,
    PAYPAL_CUSTOM_PRODUCT_ID: process.env.PAYPAL_CUSTOM_PRODUCT_ID,
    BACK_URL: process.env.BACK_URL,
    APP_NAME: `Association Envol`,
  },

  components: {
    dirs: ['~/components'],
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'fr',
            iso: 'fr-CH',
            file: 'fr/globals.json',
            name: 'Français',
          },
        ],
        parsePages: false, // https://nuxt-community.github.io/nuxt-i18n/routing.html#module-s-configuration
        defaultLocale: 'fr',
        langDir: 'content/',
        lazy: true,
        seo: true,
      },
    ],
    '@nuxtjs/svg-sprite',
  ],
  sitemap: {
    hostname: 'https://association-envol.info',
    gzip: true,
  },

  tailwindcss: {
    cssPath: '~/assets/scss/tailwind.scss',
  },
  svgSprite: {
    input: '~/assets/svg/',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: true,
  },
};
