import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Rutas relativas para que la app funcione en cualquier carpeta del hosting
  base: './',
  plugins: [
    react(),
    VitePWA({
      // El service worker se genera solo y se actualiza en segundo plano
      registerType: 'autoUpdate',
      // Los íconos también se guardan para que la app abra completa sin conexión
      includeAssets: ['icon-192.png', 'icon-512.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}'],
      },
      // Manifest: es lo que permite instalar la app en el celular
      manifest: {
        name: 'Tareas académicas',
        short_name: 'Tareas',
        description: 'Lista de tareas académicas con prioridades y fechas de entrega',
        lang: 'es',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#f1f4fa',
        theme_color: '#1f4fd8',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
});
