import { Before, Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe, type TableOf, worldAs } from './common.ts'
import { type AnswerRaw, toAnswers, toCorrectAnswers, toExplanations } from './question-parse.ts'
import QuizTakingPage from '../pages/quiz-taking-page'

interface QuizQuestionData {
    readonly question: string
    readonly answers: readonly string[]
    readonly correctAnswers: number[]
    readonly explanations: readonly string[]
    readonly questionExplanation?: string
}

interface QuizQuestion {
    readonly quizQuestionId: number
    readonly quizQuestion: QuizQuestionData
}

interface QuizQuestionWorld {
    quizTakingPage: QuizTakingPage
    questionWip: QuizQuestionData
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
    /^a quiz question "(.*)" bookmarked as "(.*)" with answers(?: and question explanation "(.*)")?$/,
    async (
        question: string,
        bookmark: string,
        questionExplanation: string | undefined,
        answerRawTable: TableOf<AnswerRaw>,
    ) => {
        await bookmarkQuizQuestion(bookmark, {
            question,
            answers: toAnswers(answerRawTable.raw()),
            correctAnswers: toCorrectAnswers(answerRawTable.raw()),
            explanations: toExplanations(answerRawTable.raw()),
            questionExplanation: questionExplanation || undefined,
        })
    },
)

Given('a quiz question {string}', (question: string) => {
    world.questionWip = { question, answers: [], correctAnswers: [0], explanations: [] }
})

Given('with answers', (answerRawTable: TableOf<AnswerRaw>) => {
    world.questionWip = {
        ...world.questionWip,
        answers: toAnswers(answerRawTable.raw()),
        correctAnswers: toCorrectAnswers(answerRawTable.raw()),
        explanations: toExplanations(answerRawTable.raw()),
    }
})

Given('bookmarked as {string}', async (bookmark: string) => {
    await bookmarkQuizQuestion(bookmark, world.questionWip)
})

When('I visit the {string} quiz-taking page', async (bookmark: string) => {
    world.activeBookmark = bookmark
    const quizId = world.bookmarks[bookmark].quizQuestionId
    console.log(`Navigating to the quiz-taking page: ${quizId}`)
    await world.quizTakingPage.goto(quizId)
})

When('I select the answer {string}', async (answerList: string) => {
    for (const answer of answerList.split(',')) {
        await world.quizTakingPage.selectAnswer(answer)
    }
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

Then('I should see the explanation {string}', async (explanation: string) => {
    const explanationLocator = world.quizTakingPage.answerExplanationLocator()
    await expectTextToBe(explanationLocator, explanation)
})

Then('I should see question explanation {string}', async (questionExplanation: string) => {
    const questionExplanationLocator = world.quizTakingPage.questionExplanationLocator()
    await expectTextToBe(questionExplanationLocator, questionExplanation)
})
