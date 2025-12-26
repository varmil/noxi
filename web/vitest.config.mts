import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    root: './',
    include: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    exclude: ['node_modules/**'],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
      include: [
        'app/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}',
        'features/**/*.{ts,tsx}',
        'hooks/**/*.{ts,tsx}',
        'utils/**/*.{ts,tsx}',
        'apis/**/*.{ts,tsx}',
        'lib/**/*.{ts,tsx}'
      ],
      exclude: [
        'node_modules/**',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/__tests__/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './@'),
      apis: resolve(__dirname, './apis'),
      app: resolve(__dirname, './app'),
      config: resolve(__dirname, './config'),
      features: resolve(__dirname, './features'),
      components: resolve(__dirname, './components'),
      hooks: resolve(__dirname, './hooks'),
      lib: resolve(__dirname, './lib'),
      types: resolve(__dirname, './types'),
      utils: resolve(__dirname, './utils')
    }
  }
})
