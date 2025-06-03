// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        {
          rel: 'icon', type: 'image/svg+xml', href: 'svg.svg'
        }
      ]
    }
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],

  css: ['~/assets/css/main.css'],

  pinia: {
    storesDirs: ['./stores/', './custom-folder/stores/'],

  },
  nitro: {
    experimental: {
      websocket: true
    }
  },
  
})