import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative asset paths work in any folder, Android WebView, or GitHub Pages
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'https://extraordinary-affiliated-foam-bargain.trycloudflare.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
