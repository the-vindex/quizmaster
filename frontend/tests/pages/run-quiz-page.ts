import type { Page } from '@playwright/test'

export class QuizRun {
    constructor(private page: Page) {}

    goto = () => this.page.goto('/quiz/new')

    CreateQuizInputLocator = () => this.page.locator('input[id="quizName"]')

    CreateQuizButtonLocator = () => this.page.locator('input[type="submit"]')

    PickItalyLocator = () => this.page.locator('input[id="answer-1"]')

    PickFranceLocator = () => this.page.locator('input[id="answer-11"]')

    GoToQuizRunLocator = () => this.page.getByText('text=Link to the Quiz Run ')

    HeaderLocator = () => this.page.locator('h1')

    DescriptionLocator = () => this.page.locator('p')

    ButtonLocator = () => this.page.locator('button')

    startQuiz = async () => {
        await this.ButtonLocator().click()
        await this.page.waitForURL('**/question/*')
    }
}
