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
    'prefer-const': 'off',
    'vue/no-mutating-props': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/valid-v-model': 'off'
  }
};
