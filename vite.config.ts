import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [tsconfigPaths(), svelte()],
  server: {
    port: 3000,
  },
});
