import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module"
    },
    extends: ["eslint:recommended"],
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "single"],
      "no-unused-vars": ["warn"],
      "no-console": "off"
    }
  }
]);
