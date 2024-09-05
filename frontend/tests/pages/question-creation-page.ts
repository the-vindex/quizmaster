import type { Page } from '@playwright/test'

export default class QuizCreationPage {
    constructor(private page: Page) {}

    goto = async () => this.page.goto('/create-question')

    questionLocator = () => this.page.locator('#question-text-area')

    formLocator = () => this.page.locator('form.question-create-form')

    enterQuestion = (question: string) => this.page.fill('#question-text-area', question)
}
