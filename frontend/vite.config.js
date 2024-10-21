import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/sikinchaa': {
        target: 'http://localhost:3000',  // Point to your backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
