import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    {
      name: "copy-static-assets",
      generateBundle() {
        const distPath = path.resolve(__dirname, "dist");
        const foldersToCopy = ["data", "public"];
        
        foldersToCopy.forEach((folder) => {
          const src = path.resolve(__dirname, folder);
          const dest = path.resolve(distPath, folder);
          
          if (fs.existsSync(src)) {
            fs.copySync(src, dest);
            console.log(`Copied ${folder} to ${dest}`);
          } else {
            console.warn(`Folder ${folder} does not exist and was not copied.`);
          }
        });
      },
    },
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('data/') || id.includes('public/')) {
            return 'static-assets';
          }
        }
      }
    }
  },
  publicDir: path.resolve(__dirname, "public"),
});