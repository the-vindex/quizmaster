import type { Page } from '@playwright/test'

export class QuizResultPage {
    constructor(private page: Page) {}

    goto = () => this.page.goto('/quizmaster/1/result')

    quizLocator = () => this.page.locator('#quiz-result-page')

    feedbackLocator = () => this.page.locator('#feedback-summary')
}
