import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: process.env.IS_DEV !== "true" ? "./" : "/",
  build: {
    outDir: "app/build",
  },
  plugins: [react()],
});
