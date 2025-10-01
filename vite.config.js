import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // frontend dev server
    proxy: {
      "/api": {
        target: "https://excel-analytics-backend-5umy.onrender.com", // backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
