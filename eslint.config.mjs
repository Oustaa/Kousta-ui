import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { ignores: ["**/cjs/**", "**/dist/**", "**/build/**", "**/esm/**", "**/demos/**"] },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        },
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
        },
      ],
      semi: "error",
      "no-var": "error",
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
