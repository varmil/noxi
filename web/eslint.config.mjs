/* eslint-disable import/no-anonymous-default-export */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { includeIgnoreFile, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import _import from 'eslint-plugin-import'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

const { ignores } = includeIgnoreFile(gitignorePath)

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  { ignores: [...ignores, '**/*.md', '**/*.json'] },

  ...compat.extends('next/core-web-vitals'),

  {
    plugins: {
      //   'unused-imports': unusedImports,
      _import: fixupPluginRules(_import)
    },

    languageOptions: {
      parser: tsParser // https://github.com/vercel/next.js/discussions/56195
    },

    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index'
          ],

          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'never',

          alphabetize: {
            order: 'asc'
          },

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
          ]
        }
      ],

      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Please import from `lib/navigation` instead.'
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
        ,
        {
          name: 'next/router',
          importNames: ['useRouter'],
          message: 'Please import from `lib/navigation` instead.'
        }
      ]
    }
  }
]
