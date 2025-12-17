import { resolve } from 'path'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    root: './',
    include: ['apps/**/*.spec.ts', 'libs/**/*.spec.ts'],
    setupFiles: ['./scripts/vitest/vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
      exclude: [
        'node_modules/**',
        '**/*.controller.ts',
        '**/*.module.ts',
        '**/*.dto.ts',
        '**/*.e2e-spec.ts'
      ]
    }
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' }
    })
  ],
  resolve: {
    alias: {
      '@presentation': resolve(
        __dirname,
        'apps/closed-api-server/src/presentation'
      ),
      '@app': resolve(__dirname, 'libs/application'),
      '@domain': resolve(__dirname, 'libs/domain'),
      '@infra': resolve(__dirname, 'libs/infrastructure'),
      '@prisma/generated/client': resolve(__dirname, 'prisma/generated/client'),
      apps: resolve(__dirname, 'apps'),
      libs: resolve(__dirname, 'libs')
    }
  }
})
