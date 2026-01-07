import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3333',
        changeOrigin: true,
        secure: false
      },
      '/moedas': {
        target: 'http://localhost:3333',
        changeOrigin: true,
        secure: false
      },
      '/profile': {
        target: 'http://localhost:3333',
        changeOrigin: true,
        secure: false
      },
      // '/loja': {
      //   target: 'http://localhost:3333',
      //   changeOrigin: true,
      //   secure: false
      // },
      '/ofertas': {
        target: 'http://localhost:3333',
        changeOrigin: true,
        secure: false
      },
      '/feedback': {
        target: 'http://localhost:3333',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
