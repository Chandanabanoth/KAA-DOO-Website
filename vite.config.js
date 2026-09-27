import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/KAA-DOO-Website/",

  plugins: [react()],

  server: {
    host: true,
    port: 5173
  },

  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
