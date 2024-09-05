import type { Page } from '@playwright/test'

export default class QuizCreationPage {
    constructor(private page: Page) {}

    goto = async () => this.page.goto('/quiz-question/all')

    getTitle = () => this.page.locator('h1').innerText()

    questionCheckboxLocator = (id: string) => this.page.locator(`input[type="checkbox"][value="${id}"]`)

    selectQuestionById = (id: string) => this.questionCheckboxLocator(id).check()

    // getSelectedIds = () =>
    //     this.page
    //         .locator('input[type="checkbox"]:checked')
    //         .evaluateAll(elements => elements.map(el => (el as HTMLInputElement).value))

    clearSelectedIds = async () => {
        const selectedCheckboxes = await this.page.locator('input[type="checkbox"]:checked')
        const count = await selectedCheckboxes.count()
        for (let i = 0; i < count; i++) {
            await selectedCheckboxes.nth(i).uncheck()
        }
    }

    selectRandomQuizId = async () => {
        const checkboxes = await this.page.locator('input[type="checkbox"]')
        const count = await checkboxes.count()
        if (count > 0) {
            const randomIndex = Math.floor(Math.random() * count)
            await checkboxes.nth(randomIndex).check()
        }
    }

    submitQuiz = async () => {
        await this.page.locator('input[type="submit"]').click()
        const quizId = await this.page.url().split('/').pop()
        return quizId
    }

    getSubmittedQuestions = () => this.page.locator('.quiz-questions li').allTextContents()

    getQuizLink = () => this.page.locator('a.quiz-link').getAttribute('href')

    getValidationError = () => this.page.locator('.validation-error').innerText()

    getUrl = () => this.page.url()
}
