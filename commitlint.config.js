module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-min-length':[2, 'always', 10],
    'body-min-length': [2, 'always', 10],
    'scope-enum': [2, 'always', [
      'auth'
    ]],
  },
};
