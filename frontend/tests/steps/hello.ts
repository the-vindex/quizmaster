import { Given, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import type { World } from './common'


Given('I navigate to the home page', async function (this: World) {
    await this.page.goto('/')
})

Then('I should see the title {string}', async function (this: World, title: string) {
    await expect(this.page).toHaveTitle(title)
})

Then('I should see the message {string}', async function (this: World, message: string) {
    const messageLocator = this.page.locator('p')
    await expect(messageLocator).toHaveText(message)
})
