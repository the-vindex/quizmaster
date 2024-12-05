import type { Page } from '@playwright/test'

export class TakeQuestionPage {
    constructor(private page: Page) {}

    goto = async (id: number) => this.page.goto(`/question/${id}`)

    questionLocator = () => this.page.locator('h1')

    getQuestionType = () => this.page.locator('.question-type').innerText()

    answersLocator = () => this.page.locator('li')

    answerLocator = (answer: string) =>
        this.page.locator(`input[type="checkbox"][value="${answer}"],input[type="radio"][value="${answer}"]`)

    answerExplanationLocatorForAnswer = (answer: string) =>
        this.page
            .locator(`input[type="checkbox"][value="${answer}"],input[type="radio"][value="${answer}"]`)
            .locator('..')
            .locator('span.explanation')

    selectAnswer = (answer: string) => this.answerLocator(answer).check()

    submit = () => this.page.locator('input[type="submit"]').click()

    feedbackLocator = () => this.page.locator('p.feedback')

    answerExplanationLocator = () => this.page.locator('span.explanation')

    getFeedback = () => this.page.locator('.feedback').innerText()

    questionExplanationLocator = () => this.page.locator('p.questionExplanation')
}
