import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "/src"),
      components: path.resolve(__dirname, "./src/components"),
      reducers: path.resolve(__dirname, "./src/reducers"),
      utils: path.resolve(__dirname, "./src/utils"),
      pages: path.resolve(__dirname, "./src/pages"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      services: path.resolve(__dirname, "./src/services"),
      assets: path.resolve(__dirname, "./src/assets"),
      api: path.resolve(__dirname, "./src/api"),
      store: path.resolve(__dirname, "./store"),
    },
  },
  plugins: [react()],
});
