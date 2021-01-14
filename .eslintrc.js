module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
  ],
  plugins: ["jest"],
  env: {
    "jest/globals": true,
    browser: true,
  },
  rules: {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "no-unused-vars": "warn",
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": ["warn"],
      },
    },
  ],
};
