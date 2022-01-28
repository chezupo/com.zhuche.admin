import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@/*', replacement: './src/*' },
      { find: '@/styles/*', replacement: './src/styles/*' }
    ]
  }
})
