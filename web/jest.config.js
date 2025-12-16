const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './'
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/@/$1',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^lib/(.*)$': '<rootDir>/lib/$1',
    '^hooks/(.*)$': '<rootDir>/hooks/$1',
    '^apis/(.*)$': '<rootDir>/apis/$1',
    '^config/(.*)$': '<rootDir>/config/$1',
    '^features/(.*)$': '<rootDir>/features/$1',
    '^types/(.*)$': '<rootDir>/types/$1',
    '^utils/(.*)$': '<rootDir>/utils/$1'
  },
  transformIgnorePatterns: ['node_modules/(?!(next-intl|use-intl)/)'],
  // TypeScript型チェックを有効化
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
