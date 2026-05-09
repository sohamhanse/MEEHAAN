import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import os from 'os'

export default defineConfig({
  plugins: [react()],
  cacheDir: path.join(os.tmpdir(), 'vite-meehaan'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'motion': ['framer-motion'],
          'gsap': ['gsap'],
          'three': ['three', '@react-three/fiber', '@react-three/drei', '@splinetool/react-spline', '@splinetool/runtime'],
          'swiper': ['swiper'],
          'ui': ['lucide-react', 'react-icons'],
        },
      },
    },
  },
})
