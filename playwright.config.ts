/** AUTO-SUMMARY **
   Purpose: This file configures the testing environment for the project using Playwright, a Node.js library for browser automation.

   Key Components:
   - `defineConfig`: Function used to set up the configuration for Playwright tests.
   - `devices`: Imported module from Playwright that provides device configurations.
   - Configuration settings: Includes settings for test directory, matching test files, timeouts, retries, browser options, and specific device projects.

   Functional Overview: The configuration specifies the directory for test files, patterns to match test files, default timeout settings, retry behavior, browser settings (like running headless and viewport size), and handling of HTTPS errors. It also defines multiple device-specific configurations for running tests on different browsers and devices, although most are commented out except for 'Desktop Chrome'.

   Dependencies and Integrations: This configuration relies on the Playwright testing framework and is likely integrated with the project's continuous integration (CI) pipeline, as indicated by the use of `process.env.CI` in determining whether to reuse existing servers.

   Additional Context: The configuration includes a web server setup that is started with a specific npm command, indicating integration with the project's development server setup. The commented-out configurations suggest potential scalability for testing across various devices and browsers in the future.
*** END-SUMMARY **/
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './__tests__',
  testMatch: '**/*.spec.ts',
  timeout: 30000,
  retries: 2,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] }
    }
    // {
    //   name: 'Desktop Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'Desktop Safari',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    // stdout: 'pipe',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI
  }
})
