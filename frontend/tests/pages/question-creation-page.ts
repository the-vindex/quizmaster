import type { Page } from '@playwright/test'

export default class QuestionCreationPage {
    constructor(private page: Page) {}

    goto = async () => this.page.goto('/create-question')

    questionLocator = () => this.page.locator('#question-text-area')

    formLocator = () => this.page.locator('form.question-create-form')

    enterQuestion = (question: string) => this.page.fill('#question-text-area', question)

    enterAnswer = async (index: number, value: string, correct: boolean) => {
        await this.page.fill(`#answer-text-${String(index + 1)}`, value)
        if (correct) {
            await this.page.check(`#answer-checkbox-${String(index + 1)}`)
        }
    }

    clickSubmitButton = async () => this.page.locator('button.submitButton').click()

    linkLocator = () => this.page.locator('#question-link')
}
