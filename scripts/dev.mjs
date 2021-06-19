"use strict";
import esbuild from "esbuild";
import path from "path";
import * as fse from "fs-extra";
import sveltePlugin from "esbuild-svelte";
import postcssPlugin from "@chialab/esbuild-plugin-postcss";
import chalk from "chalk";
import chokidar from "chokidar";
import config, { outPath, __dirname } from "./config.mjs";

const popupPath = path.resolve(__dirname, "../src/popup.js");
const contentScriptPath = path.resolve(__dirname, "../src/content_script.js");
const publicPath = path.resolve(__dirname, "../public");

console.log(`--- BUILDING IN WATCH MODE ---`);

chokidar
  .watch([popupPath, contentScriptPath, publicPath], {})
  .on("all", (_, triggerPath) => {
    if (triggerPath.includes("public")) {
      fse.copySync(publicPath, outPath, {
        overwrite: true,
      });
    }

    if (triggerPath.includes("popup.js")) {
      console.log(chalk.green("Detected change, rebuilding popup.js"));
      esbuild
        .build({
          ...config,
          entryPoints: {
            popup: popupPath,
          },
          plugins: [sveltePlugin(), postcssPlugin()],
        })
        .catch(console.error);
    }

    if (triggerPath.includes("content_script.js")) {
      console.log(chalk.green("Detected change, rebuilding content_script.js"));
      esbuild
        .build({
          ...config,
          entryPoints: {
            content_script: contentScriptPath,
          },
        })
        .then((result) => {
          if (result.errrors) console.log(chalk.red(result.errors));
        })
        .catch(console.error);
    }
  });
