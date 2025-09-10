import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_DEV_PORT || 5173,
    open: true,
    host: true
  },
  preview: {
    port: process.env.PORT || 4173,
    host: true,
    allowedHosts: [
      'sistema-calificaciones.onrender.com',
      '.onrender.com'
    ]
  }
})