import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      
    port: 5173, 
    allowedHosts: ['d0b4-2a02-3100-2467-3300-ca1c-9369-6047-aca3.ngrok-free.app'],     
  },
})
