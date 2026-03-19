import tailwindcss from "@tailwindcss/vite";
import daisyui from 'daisyui';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
  ],
  vite: {
    plugins: [
      tailwindcss() as any,
      daisyui
    ]
  },
  css: [
    '~/assets/css/main.css'
  ],
  daisyui: {
    themes: ['light'],
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})
