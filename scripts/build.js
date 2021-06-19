const esbuild = require("esbuild");
const path = require("path");
const fse = require("fs-extra");

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
});

esbuild.buildSync({
  target: "es5",
  bundle: true,
  outdir: path.resolve(process.cwd(), "dist"),
  entryPoints: {
    content_script: path.resolve(__dirname, "../src/content_script.js"),
  },
});
