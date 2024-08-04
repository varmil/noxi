import eslint from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'
import { zones } from './no-restricted-pahts.mjs'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      import: importPlugin
      // 'unused-imports': unuserdPlugin
    },

    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
    },

    settings: {
      'import/resolver': {
        typescript: true
      }
    },

    rules: {
      // 'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      'import/no-restricted-paths': ['error', { zones }],

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],

          pathGroupsExcludedImportTypes: ['builtin'],

          pathGroups: [
            { pattern: '@app/**', group: 'parent', position: 'before' },
            { pattern: '@domain/**', group: 'parent', position: 'before' },
            { pattern: '@infra/**', group: 'parent', position: 'before' }
          ],

          alphabetize: {
            order: 'asc'
          }
        }
      ]
    }
  },
  {
    files: ['eslint.config.mjs', '**/*.js'],
    ...tseslint.configs.disableTypeChecked
  }
)
