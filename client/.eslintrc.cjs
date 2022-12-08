/* global module */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "error",
    "react/no-unescaped-entities": ["off"],
    "react/self-closing-comp": ["error"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
