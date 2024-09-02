import type { Page } from '@playwright/test'

export default class QuizTakingPage {
    constructor(private page: Page) {}

    goto = async (id: number) => this.page.goto(`/quiz/${id}`)

    questionLocator = () => this.page.locator('h1')

    answersLocator = () => this.page.locator('li')

    answerLocator = (answer: string) => this.page.locator(`input[type="radio"][value="${answer}"]`)

    selectAnswer = (answer: string) => this.answerLocator(answer).check()

    submit = () => this.page.locator('input[type="submit"]').click()

    feedbackLocator = () => this.page.locator('p.feedback')
}
