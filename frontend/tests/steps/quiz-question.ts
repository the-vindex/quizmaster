import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe, type TableOf, type World } from './common'

import type { QuizQuestion } from '../../src/model/quiz-question.ts'

type AnswerRaw = [string]
type Answers = string[]

const toAnswers = (raw: AnswerRaw[]): Answers => raw.map(([answer]) => answer)

interface QuizQuestionWorld extends World {
    quizQuestion: QuizQuestion
}

const saveQuizQuestion = async (quizQuestion: QuizQuestion) =>
    await fetch('http://localhost:8080/api/quiz-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizQuestion)
    })
        .then(response => response.text())
        .then(Number.parseFloat)


Given('I create a quiz question {string} with answers', async function (this: QuizQuestionWorld, question: string, table: TableOf<AnswerRaw>) {
    const quizQuestion = { question, answers: toAnswers(table.raw()) }
    const id = await saveQuizQuestion(quizQuestion)

    this.quizQuestion = { id, ...quizQuestion }
})

When('I visit the quiz-taking page', async function (this: QuizQuestionWorld) {
    await this.page.goto(`/quiz/${this.quizQuestion.id}`)
})

Then('I should see the question', async function (this: QuizQuestionWorld) {
    const questionLocator = this.page.locator('h1')
    await expectTextToBe(questionLocator, this.quizQuestion.question)
})

Then('I should see the answers', async function (this: QuizQuestionWorld) {
    const answers = this.quizQuestion.answers
    const answerLocators = this.page.locator('li')

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, answer] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
})
