import { Linter } from "eslint";

export default /** @type {Linter.Config} */ ({
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "next/core-web-vitals"
  ],
  plugins: ["react"],
  rules: {
    // ваші правила
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
