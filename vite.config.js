import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viewport from 'postcss-mobile-forever'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig(env => {
  const viteEnv = loadEnv(env.mode, process.cwd())
  return {
    plugins: [
      vue(),
      UnoCSS({
          configFile: './uno.config.js'
      }),
    ],
    esbuild:{
      drop: ['console', 'debugger'], // 删除 console debugger
    },
    base: viteEnv.VITE_APP_FIX,
    resolve: {
      alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      port: 6666,
      proxy: {
        '/api': {
            // target: 'http://10.10.24.126:9075',
            target: 'http://10.10.24.132:9075',
            // target: 'http://10.10.143.51:8080',
            changeOrigin: true,
            rewrite: path => path.replace('/api', ''),
        }
      }
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          viewport({
            appSelector: '#app',
            viewportWidth: 375,
            maxDisplayWidth: 750,
            border: true,
            exclude: [/node_modules/],
          })
        ]
      }
    }
  }
})
