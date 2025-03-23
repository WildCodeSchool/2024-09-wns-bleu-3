import path from 'path'
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, 
    hmr: { path: "/hmr"}, 
    watch: {
      usePolling: true,
    }, 
    allowedHosts: true
  },
  test: { globals: true, environment: "jsdom" },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
