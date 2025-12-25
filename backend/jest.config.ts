import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
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
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.controller.ts',
    '!**/*.module.ts',
    '!**/*.dto.ts',
    '!**/*.e2e-spec.ts',
    '!**/node_modules/**'
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@presentation(.*)$': '<rootDir>/apps/closed-api-server/src/presentation$1',
    '^@app(.*)$': '<rootDir>/libs/application$1',
    '^@domain(.*)$': '<rootDir>/libs/domain$1',
    '^@infra(.*)$': '<rootDir>/libs/infrastructure$1',
    '^@prisma/generated/client$': '<rootDir>/prisma/generated/client/client',
    '^apps(.*)$': '<rootDir>/apps$1',
    '^libs(.*)$': '<rootDir>/libs$1'
  },
  setupFilesAfterEnv: ['./scripts/jest/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
}

export default config
