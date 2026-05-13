// vite.config.ts
import { defineConfig } from "file:///C:/Users/agueye/Desktop/cnc-connect-hub/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/agueye/Desktop/cnc-connect-hub/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/agueye/Desktop/cnc-connect-hub/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\agueye\\Desktop\\cnc-connect-hub";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
    hmr: {
      overlay: false
    },
    proxy: {
      // Remote VPS (masked for local dev)
      // "/api": {
      //   target: "http://188.165.77.237:5010",
      //   changeOrigin: true,
      // },
      // "/admin": {
      //   target: "http://188.165.77.237:5010",
      //   changeOrigin: true,
      // },
      // "/uploads": {
      //   target: "http://188.165.77.237:5010",
      //   changeOrigin: true,
      // },
      // Local backend
      "/api": {
        target: "http://188.165.77.237:5010",
        changeOrigin: true
      },
      "/uploads": {
        target: "http://188.165.77.237:5010",
        changeOrigin: true
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"]
  }
}));
export {
  vite_config_default as default
};
