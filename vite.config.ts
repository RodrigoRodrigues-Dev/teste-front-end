import { defineConfig, type ProxyOptions } from "vite";
import react from "@vitejs/plugin-react";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

const productsProxy: Record<string, ProxyOptions> = {
  "/api/produtos": {
    target: "https://app.econverse.com.br",
    changeOrigin: true,
    rewrite: () => "/teste-front-end/junior/tecnologia/lista-produtos/produtos.json",
  },
};

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: productsProxy,
  },
  preview: {
    proxy: productsProxy,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // Specify symbolId format
      symbolId: "icon-[dir]-[name]",

      /**
       * custom insert position
       * @default: body-last
       */
      inject: "body-last",

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: "__svg__icons__dom__",
    }),
  ],
});
