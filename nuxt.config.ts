import tailwindcss from "@tailwindcss/vite";
import daisyui from "daisyui";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  modules: [
    '@nuxt/content',
  ],
  vite: {
    plugins: [
      tailwindcss() as any,
      daisyui
    ],
  },
  css: [ '~/assets/css/main.css'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? 'http://localhost:8000'
    }
  }
})
