import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Node <19 için Web Crypto patch (gerekirse)
// if (!globalThis.crypto?.getRandomValues) {
//   const { webcrypto } = await import('node:crypto')
//   globalThis.crypto = webcrypto
// }

export default defineConfig({
  plugins: [react()],
  base: './',
})
