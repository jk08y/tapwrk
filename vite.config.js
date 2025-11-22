// path: vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Tapwrk',
        short_name: 'Tapwrk',
        description: 'Premium Micro-Earnings Platform',
        theme_color: '#F2F2F7',
        background_color: '#F2F2F7',
        display: 'standalone',
        icons: [
          {
            src: 'logo.png', // Ensure you have this in /public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})