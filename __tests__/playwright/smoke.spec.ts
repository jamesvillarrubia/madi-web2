/** AUTO-SUMMARY **
   Purpose: This file contains a Playwright test script designed to automate testing of web application routes and UI interactions.

   Key Components:
   - Playwright test setup and route handling for `/users`, `/tools`, and `/chats`.
   - UI interaction tests including navigation, clicking, and form filling.

   Functional Overview: The script automates the testing of API route responses and simulates user interactions such as navigating to a page, opening chats, renaming them, and sending messages. It also tests the UI's response to these interactions.

   Dependencies and Integrations: The script uses the Playwright testing framework, specifically integrating with its `page` object to control and test a web application. It mocks API responses for specific routes to test the application's handling of these responses.

   Additional Context: The test sets a timeout of 30 seconds to accommodate potentially slow network responses or heavy UI rendering. The script includes detailed interaction with form elements and buttons, indicative of testing a chat application's functionality.
*** END-SUMMARY **/
import { test } from '@playwright/test'

test('test', async ({ page }) => {
  test.setTimeout(30000)

  await page.route('http://localhost:3030/users', async (route) => {
    const json = { data: { email: 'test', name: 'test', id: 0 } }
    await route.fulfill({ json })
  })

  await page.route('http://localhost:3030/tools', async (route) => {
    console.log('TOOLS FIRED')
    const json = {
      data: [
        {
          type: 'function',
          display: 'get_joke',
          plugin: 'CAS Scenarios',
          function: {
            name: 'get_joke',
            description: 'Get a joke from the joke database',
            parameters: {}
          }
        }
      ]
    }
    await route.fulfill({ json })
  })

  await page.route('http://localhost:3030/chats', async (route) => {
    const json = { data: [{ id: 0 }] }
    await route.fulfill({ json })
  })

  await page.goto('http://localhost:3000/')
  await page
    .locator('div')
    .filter({ hasText: /^New Chat$/ })
    .first()
    .click()
  await page
    .locator('div')
    .filter({ hasText: /^Untitled$/ })
    .nth(1)
    .click()

  await page.getByRole('heading', { name: 'Untitled' }).click()
  await page.getByPlaceholder('Name the chat...').fill('New Name')
  await page.locator('.rt-TextFieldSlot > .rt-reset').first().click()

  // // // TODO Fix the default loading state for Playwright
  await page.waitForSelector('button:has-text("Auto")')
  await page.locator('button').filter({ hasText: 'Auto' }).click()
  await page.getByLabel('Off').click()
  await page.locator('button').filter({ hasText: 'Off' }).click()
  await page.getByLabel('Auto').click()

  await page.getByPlaceholder('Send a message...').click()
  await page.getByPlaceholder('Send a message...').fill('Hello!')

  // await page
  //   .locator('div')
  //   .filter({ hasText: /^AutoHello!$/ })
  //   .getByRole('button')
  //   .first()
  //   .click()
})
