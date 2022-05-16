import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // sourcemap: true
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@/', replacement: path.join(__dirname, './src/') }
    ]
  }
})
