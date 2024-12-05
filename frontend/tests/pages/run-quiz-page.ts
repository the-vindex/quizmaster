import type {Page} from '@playwright/test'

export class QuizIntroPage {
    constructor(
        private page: Page,
        private quizId: string,
    ) {}

    goto = () => this.page.goto(`/quizmaster/${this.quizId}/intro`)

    quizLocator = () => this.page.locator('#quiz-intro-page')
}
