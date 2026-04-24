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
    // Bundle CJS-style packages into the SSR output so ESM imports resolve.
    noExternal: ['react-helmet-async'],
  },
})
