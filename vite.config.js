import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      
    port: 5173, 
    allowedHosts: ['623897af4a1e.ngrok-free.app'],     
  },
})
