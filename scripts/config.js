const path = require("path");

const outPath = path.resolve(__dirname, "../dist");

module.exports = {
  target: "es5",
  bundle: true,
  outdir: outPath,
};
