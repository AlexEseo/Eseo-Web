// Vite settings: React, Tailwind, the "@" shortcut for the src folder,
// and one HTML file per page (home, privacy, legal, 404) so every address works on static hosting.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        privacy: path.resolve(import.meta.dirname, 'privacy/index.html'),
        legal: path.resolve(import.meta.dirname, 'legal/index.html'),
        notFound: path.resolve(import.meta.dirname, '404.html'),
      },
    },
  },
})
