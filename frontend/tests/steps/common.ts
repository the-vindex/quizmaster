import { After, Before, world } from '@cucumber/cucumber'
import { type Browser, type BrowserContext, chromium, expect, type Locator, type Page } from '@playwright/test'

const port = process.env.FE_PORT || '8080'
export const baseUrl = `http://localhost:${port}`

export interface World {
    browser: Browser
    context: BrowserContext
    page: Page
}

export const worldAs = <T>(): T & World => world as unknown as T & World

export type TableOf<T> = { raw: () => T[] }

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

export const expectTextToBe = async (locator: Locator, text: string) => expect(await locator.textContent()).toBe(text)

export const expectTextToContain = async (locator: Locator, text: string) =>
    expect(await locator.textContent()).toContain(text)

export const expectInputToBe = async (locator: Locator, text: string) => expect(await locator.inputValue()).toBe(text)

export const expectThatIsVisible = async (locator: Locator) => expect(locator).toBeVisible()

export const expectThatIsNotVisible = async (locator: Locator) => expect(locator).toBeHidden()
