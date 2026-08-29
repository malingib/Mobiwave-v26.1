import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: '/',
  // Keep source-location attributes available while developing, but never
  // ship them in production HTML where they add DOM weight and expose paths.
  plugins: [command === 'serve' && inspectAttr(), react()],
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
        // Isolate the heaviest, least-used libraries so they are not in the
        // initial/homepage bundle (addresses PSI "reduce unused JavaScript").
        // React itself is intentionally NOT split to avoid duplicate-instance
        // errors ("Cannot read properties of undefined (reading 'forwardRef')").
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
