import { defineConfig } from "tsup";
import { readFile, writeFile } from "node:fs/promises";

const DIRECTIVE = '"use client";';
const OUTPUTS = ["dist/index.js", "dist/index.cjs"];

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  // Keep peer deps out of the bundle.
  external: ["react", "react-dom", "framer-motion"],
  // Next.js App Router: the bundle surfaces hooks, so it must be a client
  // module. esbuild strips a top-level "use client" directive when bundling,
  // so we re-inject it into the JS outputs after the build. (Tokens are pure
  // constants but are bundled together here; a future minor can split a
  // server-safe `motionfold/tokens` entry.)
  async onSuccess() {
    await Promise.all(
      OUTPUTS.map(async (file) => {
        const code = await readFile(file, "utf8");
        if (code.startsWith(DIRECTIVE)) return;
        await writeFile(file, `${DIRECTIVE}\n${code}`);
      }),
    );
  },
});
