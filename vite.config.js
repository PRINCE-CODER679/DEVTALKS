import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listens on all local IPs including 127.0.0.1, localhost, and LAN
    port: 5173,
    strictPort: false
  }
})
