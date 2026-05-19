// vite.config.ts
import { defineConfig } from "file:///D:/%E4%B8%9C%E4%BF%A1%E4%BB%A3%E7%A0%81/%E6%98%8E%E6%98%9F%E6%9D%A5%E7%94%B5/start-h5/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/%E4%B8%9C%E4%BF%A1%E4%BB%A3%E7%A0%81/%E6%98%8E%E6%98%9F%E6%9D%A5%E7%94%B5/start-h5/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///D:/%E4%B8%9C%E4%BF%A1%E4%BB%A3%E7%A0%81/%E6%98%8E%E6%98%9F%E6%9D%A5%E7%94%B5/start-h5/node_modules/unplugin-vue-components/dist/vite.mjs";
import { VantResolver } from "file:///D:/%E4%B8%9C%E4%BF%A1%E4%BB%A3%E7%A0%81/%E6%98%8E%E6%98%9F%E6%9D%A5%E7%94%B5/start-h5/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import legacy from "file:///D:/%E4%B8%9C%E4%BF%A1%E4%BB%A3%E7%A0%81/%E6%98%8E%E6%98%9F%E6%9D%A5%E7%94%B5/start-h5/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\\u4E1C\u4FE1\u4EE3\u7801\\\u660E\u661F\u6765\u7535\\start-h5";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    Components({
      resolvers: [VantResolver()]
    }),
    legacy({
      targets: ["defaults", "not IE 11"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "@c": path.resolve(__vite_injected_original_dirname, "src/components")
    }
  },
  base: "./",
  server: {
    port: 9876,
    open: true,
    proxy: {
      "/active": {
        target: "http://fstest.hekouxin.com",
        changeOrigin: true
      },
      "/outcall": {
        target: "http://fstest.hekouxin.com",
        changeOrigin: true
      },
      "/starcall": {
        target: "http://mxld.5gnewcall.cn"
      }
    }
  },
  build: {
    outDir: "dist-h5-other",
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTRFMUNcdTRGRTFcdTRFRTNcdTc4MDFcXFxcXHU2NjBFXHU2NjFGXHU2NzY1XHU3NTM1XFxcXHN0YXJ0LWg1XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTRFMUNcdTRGRTFcdTRFRTNcdTc4MDFcXFxcXHU2NjBFXHU2NjFGXHU2NzY1XHU3NTM1XFxcXHN0YXJ0LWg1XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTQlQjglOUMlRTQlQkYlQTElRTQlQkIlQTMlRTclQTAlODEvJUU2JTk4JThFJUU2JTk4JTlGJUU2JTlEJUE1JUU3JTk0JUI1L3N0YXJ0LWg1L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIlxyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgeyBWYW50UmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5J1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoe1xyXG4gICAgICByZWFjdGl2aXR5VHJhbnNmb3JtOiB0cnVlXHJcbiAgICB9KSxcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICByZXNvbHZlcnM6IFtWYW50UmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuICAgIGxlZ2FjeSh7XHJcbiAgICAgIHRhcmdldHM6IFsnZGVmYXVsdHMnLCAnbm90IElFIDExJ10sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSwgIC8vXHU5MTREXHU3RjZFQFx1NEUzQXNyY1xyXG4gICAgICBcIkBjXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsXCJzcmMvY29tcG9uZW50c1wiKSwgLy9cdTkxNERcdTdGNkVAY1x1NEUzQWNvbXBvbmVudHNcclxuICAgIH1cclxuICB9LFxyXG4gIGJhc2U6ICcuLycsXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA5ODc2LFxyXG4gICAgb3BlbjogdHJ1ZSxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcvYWN0aXZlJzoge1xyXG4gICAgICAgIC8vIHRhcmdldDogJ2h0dHA6Ly8xMC4yLjM4Ljg6ODAyOScsXHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2ZzdGVzdC5oZWtvdXhpbi5jb20nLFxyXG4gICAgICAgIC8vIHRhcmdldDogJ2h0dHBzOi8veXl4eC4xMDA4Ni5jbicsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgICcvb3V0Y2FsbCc6IHtcclxuICAgICAgICAvLyB0YXJnZXQ6ICdodHRwOi8vMTAuMi4zOC41Ojg4OTUnLFxyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9mc3Rlc3QuaGVrb3V4aW4uY29tJyxcclxuICAgICAgICAvLyB0YXJnZXQ6ICdodHRwczovL3l5eHguMTAwODYuY24nLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICAnL3N0YXJjYWxsJzoge1xyXG4gICAgICAgIC8vIHRhcmdldDogJ2h0dHA6Ly8xMC40LjYuMTUxOjg4MDQnXHJcbiAgICAgICAgICAvLyB0YXJnZXQ6J2h0dHA6Ly8xMC4xLjM1LjExOTo4ODAyJ1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9teGxkLjVnbmV3Y2FsbC5jbidcclxuICAgICAgICAvLyB0YXJnZXQ6ICdodHRwOi8vMTAuMS42MC4xNjA6ODgwNCdcclxuICAgICAgICAvLyB0YXJnZXQ6ICdodHRwczovL2FnZW50cy41Z25ld2NhbGwuY24nXHJcbiAgICAgIH1cclxuICAgICAgLy8gJy9hcGknOiB7XHJcbiAgICAgIC8vICAgdGFyZ2V0OiAnaHR0cDovLzEwLjIuMzguNTo5MTkxJyxcclxuICAgICAgLy8gICBjaGFuZ2VPcmlnaW46IHRydWVcclxuICAgICAgLy8gfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIFx1MDBBMG91dERpcjogJ2Rpc3QtaDUtb3RoZXInLFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxNTAwLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHsgLy9cdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTUyMDZcdTdDN0JcdTYyNTNcdTUzMDVcclxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcclxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHsgLy9cdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTUyMDZcdTYyQzZcdTYyNTNcdTUzMDVcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VCxTQUFTLG9CQUFvQjtBQUN0VixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxZQUFZO0FBQ25CLE9BQU8sVUFBVTtBQUxqQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixxQkFBcUI7QUFBQSxJQUN2QixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDO0FBQUEsSUFDNUIsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLE1BQ0wsU0FBUyxDQUFDLFlBQVksV0FBVztBQUFBLElBQ25DLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDbEMsTUFBTSxLQUFLLFFBQVEsa0NBQVUsZ0JBQWdCO0FBQUEsSUFDL0M7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUEsUUFFVCxRQUFRO0FBQUEsUUFFUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUVWLFFBQVE7QUFBQSxRQUVSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsYUFBYTtBQUFBLFFBR1gsUUFBUTtBQUFBLE1BR1Y7QUFBQSxJQUtGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0osUUFBUTtBQUFBLElBQ1QsdUJBQXVCO0FBQUEsSUFDdkIsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsYUFBYSxJQUFJO0FBQ2YsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLG1CQUFPLEdBQUcsU0FBUyxFQUFFLE1BQU0sZUFBZSxFQUFFLEdBQUcsTUFBTSxHQUFHLEVBQUUsR0FBRyxTQUFTO0FBQUEsVUFDeEU7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
