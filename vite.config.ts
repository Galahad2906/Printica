// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ Alias para imports absolutos
    },
  },
  server: {
    port: 5173,    // 🔧 Puerto local personalizado
    open: true,    // 🔧 Abre el navegador automáticamente
  },
  preview: {
    port: 4173,    // 🔧 Puerto para vista previa de build
  },
  build: {
    sourcemap: true,       // 🐞 Útil para debug en producción
    chunkSizeWarningLimit: 1000, // ⚡ Evita warnings con bundles grandes
  },
})
