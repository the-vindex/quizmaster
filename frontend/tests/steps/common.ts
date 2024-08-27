import { After, Before, type IWorld } from '@cucumber/cucumber'
import { type Browser, type BrowserContext, chromium, type Page } from '@playwright/test'

export const baseUrl = 'http://localhost:8080'

export interface World extends IWorld {
    browser: Browser
    context: BrowserContext
    page: Page
}

Before(async function (this: World) {
    this.browser = await chromium.launch()
    this.context = await this.browser.newContext({ baseURL: baseUrl })
    this.page = await this.context.newPage()
})

After(async function (this: World) {
    await this.page.close()
    await this.context.close()
    await this.browser.close()
})
