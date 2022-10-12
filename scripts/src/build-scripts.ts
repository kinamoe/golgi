import { build } from "esbuild";

const scripts = ["build", "build-scripts"];

scripts.forEach((p) => {
  build({
    entryPoints: [`scripts/src/${p}.ts`],
    outfile: `scripts/lib/${p}.js`,
    format: "esm",
    minify: true,
    target: "es6",
  });
});
