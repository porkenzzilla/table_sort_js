module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
	  'no-alert': 'off',
	  'no-restricted-globals': 'off',
	  'no-param-reassign': 'off',
	  'no-unused-expressions': 'off',
	  'no-restricted-syntax': 'off',
	  'guard-for-in': 'warn',
	  'no-unused-vars': 'off',
	  'no-mixed-operators': 'off',
	  'no-bitwise': 'off',
	  'no-underscore-dangle': 'off',
	  'no-use-before-define': 'off',
	  'no-undef': 'off',
	  'consistent-return': 'off',
	  'no-shadow': 'off',

  },
};
