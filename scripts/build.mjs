"use strict";
import esbuild from "esbuild";
import path from "path";
import * as fse from "fs-extra";
import sveltePlugin from "esbuild-svelte";
import postcssPlugin from "@chialab/esbuild-plugin-postcss";
import config, { outPath, __dirname } from "./config.mjs";

fse.copySync(
  path.resolve(__dirname, "../public"),
  path.resolve(__dirname, "../dest"),
  {
    overwrite: true,
  }
);

esbuild.buildSync({
  target: "es5",
  bundle: true,
  outdir: path.resolve(process.cwd(), "dist"),
  entryPoints: {
    popup: path.resolve(__dirname, "../src/popup.js"),
  },
  plugins: [sveltePlugin(), postcssPlugin()],
});

esbuild.buildSync({
  target: "es5",
  bundle: true,
  outdir: path.resolve(process.cwd(), "dist"),
  entryPoints: {
    content_script: path.resolve(__dirname, "../src/content_script.js"),
  },
});
