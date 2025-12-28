import { defineConfig, devices } from '@playwright/test'

const isCI = process.env.CI === 'true'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? 'github' : 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'] }
    }
  ],

  webServer: [
    {
      command: 'npm run dev',
      cwd: '../backend',
      url: 'http://localhost:15000/api/health',
      reuseExistingServer: !isCI,
      timeout: 120 * 1000
    },
    {
      command: 'npm run dev',
      cwd: '../web',
      url: 'http://localhost:3000',
      reuseExistingServer: !isCI,
      timeout: 120 * 1000
    }
  ]
})
