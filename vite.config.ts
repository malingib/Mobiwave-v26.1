import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from "kimi-plugin-inspect-react"

export default defineConfig(({ command }) => ({
  base: '/',
  plugins: [command === 'serve' && inspectAttr(), react()],

  // Allow your domain on the development server
  server: {
    allowedHosts: ['mobiwave.co.ke'],
  },

  // Allow your domain on the preview server
  preview: {
    allowedHosts: ['mobiwave.co.ke'],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('recharts') || id.includes('/d3')) return 'viz3d';
            if (id.includes('gsap')) return 'motion-gsap';
            if (id.includes('framer-motion')) return 'motion-framer';
          }
        },
      },
    },
  },
}));