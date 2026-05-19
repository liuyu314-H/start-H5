import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),  //配置@为src
      "@c": path.resolve(__dirname,"src/components"), //配置@c为components
    }
  },
  base: './',
  server: {
    port: 9876,
    open: true,
    proxy: {
      '/active': {
        // target: 'http://10.2.38.8:8029',
        target: 'http://fstest.hekouxin.com',
        // target: 'https://yyxx.10086.cn',
        changeOrigin: true
      },
      '/outcall': {
        // target: 'http://10.2.38.5:8895',
        target: 'http://fstest.hekouxin.com',
        // target: 'https://yyxx.10086.cn',
        changeOrigin: true
      },
      '/starcall': {
        // target: 'http://10.4.6.151:8804'
          // target:'http://10.1.35.119:8802'
        // target: 'http://mxld.5gnewcall.cn'
        target: 'http://10.1.60.160:8802'
        // target: 'https://agents.5gnewcall.cn'
      }
      // '/api': {
      //   target: 'http://10.2.38.5:9191',
      //   changeOrigin: true
      // }
    }
  },
  build: {
     outDir: 'dist-h5-other',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: { //静态资源分类打包
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks(id) { //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
