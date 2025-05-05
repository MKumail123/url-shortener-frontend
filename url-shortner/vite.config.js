import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:44320',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     // Proxy short URLs that don't match known frontend routes
  //     '^/(?!login|register|dashboard|analytics|api).+': {
  //       target: 'http://localhost:44320',
  //       changeOrigin: true,
  //       rewrite: (path) => `/api/urlshortener/redirect${path}`,
  //     },
  //   },
  // },
});