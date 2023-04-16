import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@features": `${path.resolve(__dirname, "./src/features/")}`,
      "@pages": `${path.resolve(__dirname, "./src/pages/")}`,
      "@constants": `${path.resolve(__dirname, "./src/constants/")}`,
      "@assets": `${path.resolve(__dirname, "./src/assets/")}`,
      "@config": `${path.resolve(__dirname, "./src/config/")}`,
      "@store": `${path.resolve(__dirname, "./src/store/")}`,
      "@slices": `${path.resolve(__dirname, "./src/store/slices/")}`,
      "@interfaces": `${path.resolve(__dirname, "./src/interfaces/")}`,
      "@saga": `${path.resolve(__dirname, "./src/saga/")}`,
      "@socket": `${path.resolve(__dirname, "./src/socket/")}`,
    },
  },
});
