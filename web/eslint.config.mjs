/* eslint-disable import/no-anonymous-default-export */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { includeIgnoreFile, fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import-x'
import { zones } from './no-restricted-pahts.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

const { ignores } = includeIgnoreFile(gitignorePath)

/** @type {import("eslint").Linter.Config[]} */
export default [
  { ignores: [...ignores, '**/*.md', '**/*.json'] },

  ...fixupConfigRules([...compat.extends('next/core-web-vitals')]),

  {
    plugins: {
      //   'unused-imports': unusedImports,
      'import-x': importPlugin,
      '@typescript-eslint': tsPlugin
    },

    languageOptions: {
      parser: tsParser // https://github.com/vercel/next.js/discussions/56195
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
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  },

  // テストファイル専用の設定
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
]
