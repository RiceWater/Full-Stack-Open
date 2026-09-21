import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin";

export default defineConfig([
  js.configs.recommended,
  globalIgnores([
    "./node_modules/*",
    "./dist/*"
  ]),
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never']
    }
  },
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs"
    } 
  },
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { 
      globals: globals.browser 
    } 
  },
]);
