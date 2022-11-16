module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/ban-ts-comment': 'off'
	},
	ignorePatterns: ['dist', 'docs', 'node_modules', 'postbuild.js', 'example']
};
