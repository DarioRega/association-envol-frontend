export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'envol',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/aos.js', mode: 'client' },
    '~/plugins/form-validation.js',
    '~/plugins/getContent.js',
  ],

  components: {
    dirs: ['~/components'],
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
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
  tailwindcss: {
    cssPath: '~/assets/scss/tailwind.scss',
  },
  svgSprite: {
    input: '~/assets/svg/',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: true,
  },
};
