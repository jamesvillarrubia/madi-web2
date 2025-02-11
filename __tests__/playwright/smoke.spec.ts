import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  test.setTimeout(30000)

  await page.route('http://localhost:3030/users', async (route) => {
    const json = { data: [{ email: 'test', name: 'test', id: 0 }] }
    await route.fulfill({ json })
  })

  await page.route('http://localhost:3030/tools', async (route) => {
    const json = {
      skip:0,
      limit:0,
      total:1,
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

  // create a new chat
  await page
    .locator(':text-is("New Chat")')
    .click()

  // click on the chat
  await page
    .locator(':text-is("Untitled")')
    .nth(1)
    .click()

  // renaming the chat
  await page.getByRole('heading', { name: 'Untitled' }).click()
  await page.getByPlaceholder('Name the chat...').fill('New Name')
  await page.locator('.rt-TextFieldSlot > .rt-reset').first().click()

  // // // TODO Fix the default loading state for Playwright
  await page.waitForSelector('button:has-text("Auto")')
  await page.locator('button').filter({ hasText: 'Auto' }).click()
  await page.getByLabel('Off').click()
  await page.locator('button').filter({ hasText: 'Off' }).click()
  await page.getByLabel('Auto').click()

  // let's type some stuff in the chat
  let inp = page.getByPlaceholder('Send a message...')
  await inp.fill('Hello!')
  await inp.press('Enter')

  // confirm there's a message bubble
  let message = page.getByText('Hello!');
  expect(message).toBeVisible();

})
