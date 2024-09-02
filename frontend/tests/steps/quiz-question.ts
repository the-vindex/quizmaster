import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe, type TableOf, worldAs } from './common.ts'

interface QuizQuestion {
    readonly question: string
    readonly answers: readonly string[]
    readonly correctAnswer: number
}

type AnswerRaw = [string, string]
type Answers = string[]

const toAnswers = (raw: AnswerRaw[]): Answers => raw.map(([answer]) => answer)
const toCorrectAnswer = (raw: AnswerRaw[]): number => raw.findIndex(([, correct]) => correct === 'correct')

interface QuizQuestionWorld {
    quizQuestionId: number
    quizQuestion: QuizQuestion
}
const world = worldAs<QuizQuestionWorld>()

const saveQuizQuestion = async (quizQuestion: QuizQuestion) =>
    await fetch('http://localhost:8080/api/quiz-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizQuestion),
    })
        .then(response => response.text())
        .then(Number.parseFloat)

Given('I create a quiz question {string} with answers', async (question: string, table: TableOf<AnswerRaw>) => {
    const quizQuestion = {
        question,
        answers: toAnswers(table.raw()),
        correctAnswer: toCorrectAnswer(table.raw()),
    }

    world.quizQuestionId = await saveQuizQuestion(quizQuestion)
    world.quizQuestion = quizQuestion
})

When('I visit the quiz-taking page', async () => {
    await world.page.goto(`/quiz/${world.quizQuestionId}`)
})

When('I select the answer {string}', async (answer: string) => {
    const answerLocator = world.page.locator(`input[type="radio"][value="${answer}"]`)
    await answerLocator.check()
})

When('I submit the quiz', async () => {
    const submitLocator = world.page.locator('input[type="submit"]')
    await submitLocator.click()
})

Then('I should see the question', async () => {
    const questionLocator = world.page.locator('h1')
    await expectTextToBe(questionLocator, world.quizQuestion.question)
})

Then('I should see the answers', async () => {
    const answers = world.quizQuestion.answers
    const answerLocators = world.page.locator('li')

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, answer] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
})

Then('I should see {string}', async (feedback: string) => {
    const feedbackLocator = world.page.locator('p.feedback')
    await expectTextToBe(feedbackLocator, feedback)
})
