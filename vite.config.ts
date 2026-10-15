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
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",

      inject: "body-last",

      customDomId: "__svg__icons__dom__",
    }),
  ],
});
