import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { blogMarkdownPlugin } from "./scripts/blog-markdown";

export default defineConfig({
  plugins: [blogMarkdownPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Read by scripts/prerender.ts to preload each page's chunks (then deleted).
    manifest: true,
  },
  server: {
    host: true,
  },
});
