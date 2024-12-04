import type { Page } from '@playwright/test'

export default class QuestionCreationPage {
    constructor(private page: Page) {}

    goto = async () => this.page.goto('/create-question')

    questionLocator = () => this.page.locator('#question-text-area')

    enterQuestion = (question: string) => this.questionLocator().fill(question)

    enterAnswer = async (index: number, value: string, correct: boolean, explanation: string) => {
        const value1 = index + 1
        await this.page.fill(`#answer-text-${String(value1)}`, value)
        await this.page.fill(`#answer-explanation-${String(value1)}`, explanation)
        if (correct) {
            await this.page.check(`#answer-checkbox-${String(value1)}`)
        }
    }

    enterGeneralExplanation = (question: string) => this.page.fill('textArea.generalExplanation', question)

    submit = async () => this.page.locator('button.submitButton').click()

    questionUrlLocator = () => this.page.locator('#question-link')

    questionUrl = () => this.questionUrlLocator().textContent()
}
