import { resolve } from 'path'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    root: './',
    include: ['apps/**/test/*.e2e-spec.ts'],
    testTimeout: 15000,
    sequence: {
      concurrent: false
    }
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' }
    })
  ],
  resolve: {
    alias: {
      '@presentation': resolve(__dirname, 'apps/closed-api-server/src/presentation'),
      '@app': resolve(__dirname, 'libs/application'),
      '@domain': resolve(__dirname, 'libs/domain'),
      '@infra': resolve(__dirname, 'libs/infrastructure'),
      '@prisma/generated/client': resolve(
        __dirname,
        'prisma/generated/client/client'
      ),
      'apps': resolve(__dirname, 'apps'),
      'libs': resolve(__dirname, 'libs')
    }
  }
})
