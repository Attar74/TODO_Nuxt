// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    externals: {
      inline: ['uuid'],
    },
  },
  modules: ["@nuxt/ui"]
})
