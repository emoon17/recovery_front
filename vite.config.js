// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/test': {  //  /api로 수정 예정
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path, // 경로 그대로
      },
    },
  },
})
