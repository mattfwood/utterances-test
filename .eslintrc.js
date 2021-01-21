module.exports = {
  extends: ['cratebind'],
  rules: {
    'import/no-unused-modules': 0,
    'no-console': 1,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '.'],
      },
    },
  },
};
