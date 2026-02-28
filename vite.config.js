import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Keep paths through the junction (C:\tmp\anylink) so Hebrew desktop path
    // doesn't appear in resolved module IDs (avoids Windows encoding issues)
    preserveSymlinks: true,
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    fs: {
      // Allow serving from both the junction path and the real project path
      allow: ['C:/tmp/anylink', 'C:/Users/ezrac/OneDrive/שולחן העבודה/anybuddy'],
    },
  },
})
