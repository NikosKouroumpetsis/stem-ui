// https://nuxt.com/docs/api/configuration/nuxt-config
import { existsSync, readFileSync } from "node:fs";
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  vite: {
    vue: {
      script: {
        fs: {
          fileExists(file: string) {
            return existsSync(file);
          },
          readFile(file: string) {
            return readFileSync(file, "utf-8");
          },
        },
      },
    },
  },
  modules: ["@nuxtjs/tailwindcss"],
});
