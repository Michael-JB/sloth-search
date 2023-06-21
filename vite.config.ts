import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    rollupOptions: {
      input: {
        popup: "/src/popup/index.html",
        options: "/src/options/index.html",
      },
    },
  },
});
