import pluginVue from 'eslint-plugin-vue'
import tsParser from "@typescript-eslint/parser"
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default [
  ...pluginVue.configs['flat/recommended'],
  ...tseslint.configs['strict'],
  ...tseslint.configs['stylistic'],
  {
    files: ['**/*.vue', '**/*.ts' ],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'vue/multi-word-component-names': 0,
      'no-multi-spaces': 2,
      'no-console': [1, { allow: ['warn', 'error', 'info'] }],
      'space-infix-ops': ['error', { int32Hint: false }],
      '@typescript-eslint/no-unused-vars': 1,
      'no-multi-spaces': 2,
      'no-trailing-spaces': 2,
      'indent': ['error', 2, { "SwitchCase": 1 }],
      'space-in-parens': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'semi-spacing': ['error', { 'before': false, 'after': true }],
      'object-curly-spacing': ['error', 'always'],
      'key-spacing': ['error', {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      }],
      'object-curly-newline': ['error', { ObjectExpression: { multiline: true, consistent: true } }],
    },
    languageOptions: {
      sourceType: 'module',
      parser:  vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser
      }
    }
  },
  {
    files: ['**/*.vue'],
    rules: {
      '@typescript-eslint/prefer-function-type': 0
    },
  }
]
