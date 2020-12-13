module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/vue'
  ],
  rules: {
    'no-new': 'off',
    'prefer-const': 'off'
  }
};
