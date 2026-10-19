import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// Hostnames this app may be reached through. Vite's dev and preview servers
// reject any request whose `Host` header is not listed here (an SSRF /
// DNS-rebinding guard), so a reverse proxy that forwards the public hostname
// must have it allowed or every request gets a 403:
//   Blocked request. This host ("mobiwave.co.ke") is not allowed.
// Override for staging or tunnels:
//   VITE_ALLOWED_HOSTS="staging.example.com,.ngrok-free.app" npm run preview
const allowedHosts = (
  process.env.VITE_ALLOWED_HOSTS ?? 'mobiwave.co.ke,www.mobiwave.co.ke,.mobiwave.co.ke'
)
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean)

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: '/',
  // Keep source-location attributes available while developing, but never
  // ship them in production HTML where they add DOM weight and expose paths.
  plugins: [command === 'serve' && inspectAttr(), react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts,
    proxy: {
      '/contact.php': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  // The preview server is for local verification of `npm run build` output.
  // Production must serve the static `dist/` directory from nginx instead —
  // see deploy/nginx/mobiwave.co.ke.conf and deploy/README.md.
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts,
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
