// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true } ,

  css: ['~/assets/css/main.css'],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app:{
    head:{
      title : 'Invoices',
      link :[
        {
          rel : 'stylesheet',
          href : "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        }
      ]
    }
  },

  modules: [
    // ...
    '@pinia/nuxt',
  ],

  runtimeConfig:{
    mongoDBURl : process.env.MONGODB_URL
  }

})
