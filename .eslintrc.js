module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"array-bracket-spacing": ["error", "never",
			{ "singleValue": false, "objectsInArrays": false, "arraysInArrays": false }
		],
		"arrow-spacing": ["error"],
		"capitalized-comments": ["warn"],
		"comma-dangle": ["warn", "never"],
		"comma-spacing": ["error", { "before": false, "after": true }],
		"comma-style": ["error", "last"],
		"curly": ["warn"],
		"default-case-last": ["error"],
		"indent": ["warn", "tab"],
		"key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
		"keyword-spacing": ["error", { "before": true, "after": true }],
		"linebreak-style": ["warn", "windows"],
		"no-console": ["warn"],
		"no-multi-spaces": ["error"],
		"no-multiple-empty-lines": ["error", { max: 1 }],
		"no-trailing-spaces": ["error"],
		"no-undef": ["warn"],
		"no-unused-vars": ["warn"],
		"no-var": ["warn"],
		"no-warning-comments": ["error"],
		"object-curly-spacing": ["error", "always"],
		"quotes": ["error", "double"],
		"semi": ["error", "always", { "omitLastInOneLineBlock": true }],
		"spaced-comment": ["error", "always"],
		"space-in-parens": ["error", "never"]
	}
};
