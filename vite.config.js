import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      
    port: 5173, 
    allowedHosts: ['b71a8c7e391a.ngrok-free.app'],     
  },
})
