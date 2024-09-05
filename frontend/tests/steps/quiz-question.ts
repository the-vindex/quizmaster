import { Before, Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe, type TableOf, worldAs } from './common.ts'
import QuizTakingPage from '../pages/quiz-taking-page'

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
    quizTakingPage: QuizTakingPage
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
    world.bookmarks[bookmark] = {
        quizQuestionId: await saveQuizQuestion(quizQuestion),
        quizQuestion,
    }
}

const activeQuizQuestion = () => world.bookmarks[world.activeBookmark].quizQuestion

Before(() => {
    world.quizTakingPage = new QuizTakingPage(world.page)
    world.bookmarks = {}
})

Given(
    'a quiz question {string} bookmarked as {string} with answers',
    async (question: string, bookmark: string, table: TableOf<AnswerRaw>) => {
        await bookmarkQuizQuestion(bookmark, {
            question,
            answers: toAnswers(table.raw()),
            correctAnswer: toCorrectAnswer(table.raw()),
        })
    },
)

When('I visit the {string} quiz-taking page', async (bookmark: string) => {
    world.activeBookmark = bookmark
    await world.quizTakingPage.goto(world.bookmarks[bookmark].quizQuestionId)
})

When('I select the answer {string}', async (answer: string) => {
    await world.quizTakingPage.selectAnswer(answer)
})

When('I submit the quiz', async () => {
    await world.quizTakingPage.submit()
})

Then('I should see the question', async () => {
    const questionLocator = world.quizTakingPage.questionLocator()
    await expectTextToBe(questionLocator, activeQuizQuestion().question)
})

Then('I should see the answers', async () => {
    const answers = activeQuizQuestion().answers
    const answerLocators = world.quizTakingPage.answersLocator()

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, answer] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
})

Then('I should see {string}', async (feedback: string) => {
    const feedbackLocator = world.quizTakingPage.feedbackLocator()
    await expectTextToBe(feedbackLocator, feedback)
})

Then('I should see question explanation {string}', async (questionExplanation: string) => {
    const questionExplanationLocator = world.quizTakingPage.questionExplanationLocator()
    await expectTextToBe(questionExplanationLocator, questionExplanation)
})
