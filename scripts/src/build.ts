import { build } from "esbuild";

const packages = ["core"];

packages.forEach((p) => {
  build({
    entryPoints: [`packages/golgi-${p}/src/index.ts`],
    bundle: true,
    outfile: `packages/golgi-${p}/lib/index.js`,
    external: ["@golgi"],
    format: "esm",
    minify: true,
    target: "es6",
  });
});
