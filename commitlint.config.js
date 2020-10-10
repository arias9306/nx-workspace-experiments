module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [2, 'never'],
    'header-min-length':[2, 'always', 10],
    'body-min-length': [2, 'always', 10],
    'scope-enum': [2, 'always', [
      'auth'
    ]],
  },
};
