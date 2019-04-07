export default {
  mode: 'universal',

  head: {
    title: 'dash - tub-aiglart.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'dash' }
    ],
    link: [
      { rel: 'icon', href: '/img/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Hind+Siliguri:300,700|Roboto:400,500,700' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    '@/static/css/reset.css',
    '@/static/css/default.css'
  ],

  plugins: [
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['cookie-universal-nuxt', { alias: 'cookies' }]
  ],

  axios: {
  },

  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
