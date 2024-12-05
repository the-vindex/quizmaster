import type { Page } from '@playwright/test'

export class QuizIntroPage {
    constructor(
        private page: Page,
        private quizId: string,
    ) {}

    goto = () => this.page.goto(`/quiz/${this.quizId}/intro`)

    quizLocator = () => this.page.locator('#quiz-intro-page')

    startQuiz = async () => {
        await this.page.locator('#start-quiz-button').click()
    }
}
