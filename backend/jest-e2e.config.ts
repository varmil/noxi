import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true
          }
        }
      }
    ]
  },
  testEnvironment: 'node',
  testTimeout: 15000,
  maxWorkers: 1,
  moduleNameMapper: {
    '^@presentation(.*)$': '<rootDir>/apps/closed-api-server/src/presentation$1',
    '^@app(.*)$': '<rootDir>/libs/application$1',
    '^@domain(.*)$': '<rootDir>/libs/domain$1',
    '^@infra(.*)$': '<rootDir>/libs/infrastructure$1',
    '^@prisma/generated/client$': '<rootDir>/prisma/generated/client/client',
    '^apps(.*)$': '<rootDir>/apps$1',
    '^libs(.*)$': '<rootDir>/libs$1'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
}

export default config
