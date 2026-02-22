module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
  ],
  rules: {
    // приклади правил, можеш додати свої
    'react/react-in-jsx-scope': 'off',
    'no-console': 'warn',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
