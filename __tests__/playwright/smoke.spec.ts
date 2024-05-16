import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page
    .locator('div')
    .filter({ hasText: /^New Chat$/ })
    .click()
  await page
    .locator('div')
    .filter({ hasText: /^Untitled$/ })
    .nth(1)
    .click()
  await page.getByRole('heading', { name: 'Untitled' }).click()
  await page.getByPlaceholder('Name the chat...').fill('New Name')
  await page.locator('.rt-TextFieldSlot > .rt-reset').first().click()
  await page.locator('button').filter({ hasText: 'Auto' }).click()
  await page.getByLabel('Off').click()
  await page.locator('button').filter({ hasText: 'Off' }).click()
  await page.getByLabel('Auto').click()
  await page.getByPlaceholder('Send a message...').click()
  await page.getByPlaceholder('Send a message...').fill('Hello!')
  await page
    .locator('div')
    .filter({ hasText: /^AutoHello!$/ })
    .getByRole('button')
    .first()
    .click()
  await page.getByRole('banner').getByRole('combobox').click()
  await page.getByRole('img').nth(1).click()
  await page.getByRole('banner').getByRole('combobox').click()
  await page.getByLabel('').nth(3).click()
  await page
    .locator('div')
    .filter({ hasText: /^New Chat$/ })
    .click()
})
