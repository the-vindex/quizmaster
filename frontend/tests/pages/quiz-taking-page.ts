import type { Page } from '@playwright/test'

export default class QuizTakingPage {
    constructor(private page: Page) {}

    goto = async (id: number) => this.page.goto(`/quiz/${id}`)

    gotoByLink = async (link: string) => this.page.goto(link)

    getTitle = async () => this.page.locator('h1').innerText()

    questionLocator = () => this.page.locator('h1')

    getQuestionType = async () => {
        return this.page.locator('.question-type').innerText()
    }

    answersLocator = () => this.page.locator('li')

    answerLocator = (answer: string) =>
        this.page.locator(`input[type="checkbox"][value="${answer}"],input[type="radio"][value="${answer}"]`)

    selectAnswer = (answer: string) => this.answerLocator(answer).check()

    submit = () => this.page.locator('input[type="submit"]').click()

    feedbackLocator = () => this.page.locator('p.feedback')

    answerExplanationLocator = () => this.page.locator('span.explanation')

    getFeedback = async () => {
        return this.page.locator('.feedback').innerText()
    }

    getQuestions = async () => {
        return this.page.locator('.quiz-questions li').allTextContents()
    }

    questionExplanationLocator = () => this.page.locator('p.questionExplanation')

    getUrl = () => this.page.url()
}
