import { PluginOption, build, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const buildContentScript = (): PluginOption => ({
  name: "build-content-script",
  buildEnd: async () => {
    await build({
      publicDir: false,
      plugins: [tsconfigPaths()],
      build: {
        target: "es2015",
        rollupOptions: {
          input: {
            content: "/src/content/index.ts",
          },
          output: {
            entryFileNames: "src/scripts/[name].js",
          },
        },
      },
      configFile: false,
    });
  },
});

export default defineConfig({
  plugins: [tsconfigPaths(), buildContentScript()],
  build: {
    target: "es2015",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: "/src/popup/index.html",
        options: "/src/options/index.html",
      },
    },
  },
});
