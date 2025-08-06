import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    origin: "http://localhost:3000",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
