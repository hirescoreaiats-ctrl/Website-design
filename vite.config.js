import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        product: resolve(__dirname, "product.html"),
        pricing: resolve(__dirname, "pricing.html"),
        resources: resolve(__dirname, "resources.html"),
        contact: resolve(__dirname, "contact.html")
      }
    }
  }
});
