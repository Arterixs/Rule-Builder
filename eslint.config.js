import pluginVue from 'eslint-plugin-vue'
import tsParser from "@typescript-eslint/parser"
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.vue'],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-console': [1, { allow: ['warn', 'error', 'info'] }],
    },
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        parser: {
          "ts": tsParser,
        }
      },
      globals: {
        ...globals.browser
      }
    }
  }
]
