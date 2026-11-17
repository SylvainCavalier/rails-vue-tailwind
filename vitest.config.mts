import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

// Kept separate from vite.config.mts: the Ruby and Inertia plugins are not needed for unit tests.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app/frontend', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['app/frontend/**/*.spec.ts'],
  },
})
