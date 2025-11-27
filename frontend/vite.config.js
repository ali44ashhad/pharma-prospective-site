// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig(({ mode }) => {
//   // Load env file based on mode (development, production)
//   const env = loadEnv(mode, process.cwd(), '')
  
//   return {
//     plugins: [
//       react(),
//       tailwindcss()
//     ],
//     define: {
//       // Make env variables available in the app
//       'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL)
//     },
//     server: {
//       port: 5173,
//       proxy: mode === 'development' ? {
//         '/api': {
//           target: env.VITE_API_BASE_URL || 'http://localhost:5000',
//           changeOrigin: true,
//           secure: false
//         }
//       } : undefined
//     },
//     build: {
//       outDir: 'dist',
//       sourcemap: false,
//       rollupOptions: {
//         output: {
//           manualChunks: {
//             'react-vendor': ['react', 'react-dom', 'react-router-dom'],
//             'ui-vendor': ['react-icons', 'react-toastify']
//           }
//         }
//       }
//     }
//   }
// })


import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'   // 👈 ADD THIS

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Pharma Prospective',
          short_name: 'Pharma',
          start_url: '/',
          display: 'standalone',
          background_color: '#0F172A',
          theme_color: '#0F172A',
          icons: [
            {
              src: '/icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        workbox: {
          // basic offline cache
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        },
      }),
    ],
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
    },
    server: {
      port: 5173,
      proxy: mode === 'development'
        ? {
            '/api': {
              target: env.VITE_API_BASE_URL || 'http://localhost:5000',
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['react-icons', 'react-toastify'],
          },
        },
      },
    },
  }
})
