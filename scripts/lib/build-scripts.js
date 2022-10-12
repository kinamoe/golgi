import{build as t}from"esbuild";const i=["build","build-scripts"];i.forEach(s=>{t({entryPoints:[`scripts/src/${s}.ts`],outfile:`scripts/lib/${s}.js`,format:"esm",minify:!0,target:"es6"})});
