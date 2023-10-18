import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { createHtmlPlugin } from 'vite-plugin-html'
import * as env from "./src/env";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        // {
        //   "naive-ui": [
        //     "useDialog",
        //     "useMessage",
        //     "useNotification",
        //     "useLoadingBar",
        //   ],
        // },
      ],
    }),
    Components({
      // 按需加载 组件
      dirs: ['src/components'],
      resolvers: [NaiveUiResolver()],
    }),
    
    createHtmlPlugin({
      inject: {
        data: env
      }
    })
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
