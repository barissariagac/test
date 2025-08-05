import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GH Pages için güvenli seçim: relative base
export default defineConfig({
  plugins: [react()],
  base: './',
})
