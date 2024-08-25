import { After, Before, Given, IWorld, Then } from '@cucumber/cucumber'
import { Browser, BrowserContext, chromium, expect, Page } from '@playwright/test'
import { baseUrl } from './common'

interface World extends IWorld {
    browser: Browser
    context: BrowserContext
    page: Page
}

Before(async function (this: World) {
    this.browser = await chromium.launch()
    this.context = await this.browser.newContext({ baseURL: baseUrl })
})

After(async function (this: World) {
    await this.page.close()
    await this.context.close()
    await this.browser.close()
})

Given('I navigate to the home page', async function (this: World) {
    this.page = await this.context.newPage()
    await this.page.goto('/')
})

Then('I should see the title {string}', async function (this: World, title: string) {
    await expect(this.page).toHaveTitle(title)
})

Then('I should see the message {string}', async function (this: World, message: string) {
    const messageLocator = this.page.locator('p')
    await expect(messageLocator).toHaveText(message)
})
