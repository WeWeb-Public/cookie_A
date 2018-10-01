module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/html-indent': [
      'error',
      4
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}