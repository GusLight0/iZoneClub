import { build } from "esbuild";
await build({
  absWorkingDir: process.cwd(),
  entryPoints: ["./tests/admin-data.test.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: "./.tmp/admin-data.test.mjs",
  define: { "import.meta.env": "{}" },
});
await import("../.tmp/admin-data.test.mjs");
