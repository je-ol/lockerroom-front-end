import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Matches all requests starting with /api
        target: 'https://locker-room-19eb97f5c50f.herokuapp.com', // Replace with your backend URL
        changeOrigin: true, // Change origin to match development server
        secure: false, // Allow for insecure connections (http) during development
      },
    },
  }
})
