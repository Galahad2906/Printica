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
    sourcemap: false, // 🚀 Desactivado en producción para reducir tamaño
    chunkSizeWarningLimit: 800, // ⚡ Ajustado para evitar warnings innecesarios
    cssCodeSplit: true, // ✅ Divide el CSS por componente para mejor cache
    minify: 'esbuild', // ⚡ Usa esbuild (más rápido que terser por defecto)
    target: 'es2017', // 🎯 Reduce JS legacy innecesario en navegadores modernos
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage'],
          swiper: ['swiper'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'firebase/app'], // ✅ Pre-bundling de deps clave
  },
})
