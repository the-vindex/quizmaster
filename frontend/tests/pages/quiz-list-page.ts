import type { Page } from '@playwright/test'

export default class QuizListPage {
    constructor(private page: Page) {}

    goto = async () => this.page.goto('/quiz-list')

}
