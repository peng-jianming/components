module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    'plugin:prettier/recommended' // https://github.com/prettier/eslint-plugin-prettier
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  plugins: ['vue'],
  rules: {
    'no-new': 'off',
    'prefer-const': 'off',
    'vue/no-mutating-props': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/valid-v-model': 'off',
    'vue/multi-word-component-names': 'off'
  }
};
