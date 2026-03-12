import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'),
      
      // agrega más alias si lo necesitas
    }
  },
   base: './',
  server: {
    host: true, // <--- escucha en todas las interfaces de red
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': 'http://127.0.0.1:4000', // redirige /api a tu backend
      
    }
  }
})
