import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Develop against the library source directly — edits to ../src are live.
      motionfold: fileURLToPath(new URL("../src/index.ts", import.meta.url)),
    },
    // Ensure a single React/Framer instance across the aliased source.
    dedupe: ["react", "react-dom", "framer-motion"],
  },
  server: { port: 5180 },
});
