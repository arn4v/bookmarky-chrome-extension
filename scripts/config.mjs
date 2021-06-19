import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const outPath = path.resolve(__dirname, "../dist");

export default {
  target: "es6",
  bundle: true,
  outdir: outPath,
};
