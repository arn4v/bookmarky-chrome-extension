"use strict";
const esbuild = require("esbuild");
const path = require("path");
const chalk = require("chalk");
const chokidar = require("chokidar");
const fse = require("fs-extra");
const config = require("./config");

const popupPath = path.resolve(__dirname, "../src/popup.js");
const contentScriptPath = path.resolve(__dirname, "../src/content_script.js");
const publicPath = path.resolve(__dirname, "../public");
const outPath = path.resolve(__dirname, "../dist");

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
      esbuild.buildSync({
        ...config,
        entryPoints: {
          popup: popupPath,
        },
      });
    }

    if (triggerPath.includes("content_script.js")) {
      console.log(chalk.green("Detected change, rebuilding content_script.js"));
      esbuild.buildSync({
        ...config,
        entryPoints: {
          content_script: contentScriptPath,
        },
      });
    }
  });
