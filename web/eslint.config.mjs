/* eslint-disable import/no-anonymous-default-export */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import importPlugin from 'eslint-plugin-import-x'
import tseslint from 'typescript-eslint'
import { zones } from './no-restricted-pahts.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

const { ignores } = includeIgnoreFile(gitignorePath)

/** @type {import("eslint").Linter.Config[]} */
export default [
  { ignores: [...ignores, '**/*.md', '**/*.json'] },

  ...nextCoreWebVitals,

  {
    plugins: {
      'import-x': importPlugin,
      '@typescript-eslint': tseslint.plugin
    },

    settings: {
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import-x/resolver': {
        typescript: true,
        node: true
      }
    },

    rules: {
      '@next/next/no-img-element': 'off',

      // eslint-plugin-react-hooks v7 で追加された新ルール（段階的に対応予定）
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/immutability': 'off',

      'import-x/no-restricted-paths': ['error', { zones }],

      'import-x/order': [
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
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before'
            },
            {
              pattern: 'src/**',
              group: 'parent',
              position: 'before'
            }
          ],

          alphabetize: {
            order: 'asc'
          }
        }
      ],

      'no-restricted-imports': [
        'error',
        {
          name: 'dayjs',
          message: 'Please import from `lib/dayjs` instead.'
        },
        {
          name: 'next/link',
          message: 'Please import from `lib/navigation` instead.'
        },
        {
          name: 'next/image',
          message: 'Please import from `components/styles/Image` instead.'
        },
        {
          name: 'next/navigation',
          importNames: [
            'redirect',
            'permanentRedirect',
            'useRouter',
            'usePathname'
          ],
          message: 'Please import from `lib/navigation` instead.'
        },
        {
          name: 'next/router',
          importNames: ['useRouter'],
          message: 'Please import from `lib/navigation` instead.'
        }
      ],

      // TypeScript関連のルール
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  },

  // テストファイル専用の設定
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
]
