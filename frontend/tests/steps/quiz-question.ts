import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe, type TableOf, worldAs } from './common.ts'

interface QuizQuestionData {
    readonly question: string
    readonly answers: readonly string[]
    readonly correctAnswer: number
}

interface QuizQuestion {
    readonly quizQuestionId: number
    readonly quizQuestion: QuizQuestionData
}

type AnswerRaw = [string, string]
type Answers = string[]

const toAnswers = (raw: AnswerRaw[]): Answers => raw.map(([answer]) => answer)
const toCorrectAnswer = (raw: AnswerRaw[]): number => raw.findIndex(([, correct]) => correct === 'correct')

interface QuizQuestionWorld {
    bookmarks: Record<string, QuizQuestion>
    activeBookmark: string
}
const world = worldAs<QuizQuestionWorld>()

const saveQuizQuestion = async (quizQuestion: QuizQuestionData) =>
    await fetch('http://localhost:8080/api/quiz-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizQuestion),
    })
        .then(response => response.text())
        .then(Number.parseFloat)

const bookmarkQuizQuestion = async (bookmark: string, quizQuestion: QuizQuestionData) => {
    if (world.bookmarks === undefined) world.bookmarks = {}

    world.bookmarks[bookmark] = {
        quizQuestionId: await saveQuizQuestion(quizQuestion),
        quizQuestion,
    }
}

Given(
    'a quiz question {string} bookmarked as {string} with answers',
    async (question: string, bookmark: string, table: TableOf<AnswerRaw>) => {
        if (world.bookmarks === undefined) world.bookmarks = {}

        await bookmarkQuizQuestion(bookmark, {
            question,
            answers: toAnswers(table.raw()),
            correctAnswer: toCorrectAnswer(table.raw()),
        })
    },
)

When('I visit the {string} quiz-taking page', async (bookmark: string) => {
    world.activeBookmark = bookmark
    await world.page.goto(`/quiz/${world.bookmarks[bookmark].quizQuestionId}`)
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
    await expectTextToBe(questionLocator, world.bookmarks[world.activeBookmark].quizQuestion.question)
})

Then('I should see the answers', async () => {
    const answers = world.bookmarks[world.activeBookmark].quizQuestion.answers
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
