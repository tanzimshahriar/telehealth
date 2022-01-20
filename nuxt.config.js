export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Telehealth',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Telehealth is a patient management web app' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/apollo-overrides',
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.BACKEND_URL || "http://localhost:1337/graphql",
        // fetchPolicy: 'no-cache',
      },
    },
    errorHandler: "~/apollo/error-handler.js",
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
  ],
  
  fontawesome: {
    component: 'fa'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo',
    'nuxt-fontawesome',
  ],

  env: {
    IMAGE_URL: process.env.CLOUDINARY_URL || "http://localhost:1337",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //analyze: true,
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
  }
}
