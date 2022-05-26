import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: [".js", ".vue", ".scss", ".ts"],
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
})
