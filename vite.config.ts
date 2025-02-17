import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json",
    }),
    tailwindcss(),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/custom-pagination/index.ts"),
      name: "custom-pagination",
      formats: ["es", "umd"],
      //fileName: (format) => `custom-pagination.${format}.js`,
      fileName: (format) => `custom-pagination/index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        banner: '"use client";',
        interop: "auto",
      },
    },
    commonjsOptions: {
      esmExternals: ["react"],
    },
  },
});
