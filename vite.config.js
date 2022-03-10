import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // output dir for production build
    emptyOutDir: true,

    outDir: 'public/dist',

    // our entry
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.js'),
    },

    // emit manifest so PHP can find the hashed files
    manifest: true,
  },
})
