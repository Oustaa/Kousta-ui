import path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const base = {
  input: "src/index.ts",
  external: ["react", "react-dom", "react/jsx-runtime"],
  treeshake: true,
  plugins: [
    nodeResolve({ extensions, preferBuiltins: false }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
      declarationDir: undefined,
    }),
  ],
};

const makeConfig = (format, outDir, cssFile) => ({
  ...base,
  output: {
    format,
    dir: path.resolve(outDir),
    entryFileNames: "[name]." + (format === "es" ? "mjs.js" : "cjs.js"),
    preserveModules: true,
    preserveModulesRoot: path.resolve(".."),
    sourcemap: true,
    interop: "auto",
    assetFileNames: (assetInfo) => {
      const name = assetInfo.name || "";
      if (name.endsWith(".css")) return "[name][extname]";
      return "assets/[name]-[hash][extname]";
    },
  },
  plugins: [
    ...base.plugins,
    postcss({
      extract: path.resolve(outDir, cssFile),
      modules: { generateScopedName: "[local]_[hash:base64:5]" },
      sourceMap: true,
      minimize: false,
    }),
  ],
});

export default [
  makeConfig("es", "esm", "index.css"),
  makeConfig("cjs", "cjs", "index.css"),
];
