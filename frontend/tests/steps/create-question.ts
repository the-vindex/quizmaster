import { Before, Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe, type TableOf, worldAs } from './common.ts'
import CreateQuestionPage from '../pages/question-creation-page.ts'
import QuizTakingPage from '../pages/quiz-taking-page.ts'

type AnswerRaw = [string, '*' | '', string]

interface Answer {
    answer: string
    isCorrect: boolean
    explanation: string
}

interface Question {
    url: string
    question: string
    answers: Answer[]
    explanation: string
}

interface QuizQuestionWorld {
    createQuestionPage: CreateQuestionPage
    quizTakingPage: QuizTakingPage
    questionWip: Question
    bookmarks: Record<string, Question>
    activeBookmark: string
}

const world = worldAs<QuizQuestionWorld>()
const activeQuestion = () => world.bookmarks[world.activeBookmark]

Before(() => {
    world.createQuestionPage = new CreateQuestionPage(world.page)
    world.quizTakingPage = new QuizTakingPage(world.page)
})

Given('a question {string}', async (question: string) => {
    await world.createQuestionPage.goto()
    await world.createQuestionPage.enterQuestion(question)
    world.questionWip = { url: '', question, answers: [], explanation: '' }
})

Given('with answers:', async (answerRawTable: TableOf<AnswerRaw>) => {
    const raw = answerRawTable.raw()
    const isMultipleChoice = raw.filter(([_, correct]) => correct === '*').length > 1

    if (isMultipleChoice) await world.createQuestionPage.setMultipleChoice()

    for (let i = 0; i < raw.length; i++) {
        const [answer, correct, explanation] = raw[i]
        const isCorrect = correct === '*'
        await world.createQuestionPage.enterAnswer(i, answer, isCorrect, explanation || '')
        world.questionWip.answers[i] = { answer, isCorrect, explanation }
    }
})

Given('with explanation {string}', async (explanation: string) => {
    await world.createQuestionPage.enterGeneralExplanation(explanation)
    world.questionWip.explanation = explanation
})

Given('saved and bookmarked as {string}', async (bookmark: string) => {
    await world.createQuestionPage.submit()
    world.questionWip.url = (await world.createQuestionPage.questionUrl()) || ''
    world.bookmarks[bookmark] = world.questionWip
})

When('I take question {string}', async (bookmark: string) => {
    await world.page.goto(world.bookmarks[bookmark].url)
    world.activeBookmark = bookmark
})

Then('I see the question and the answers', async () => {
    await expectTextToBe(world.quizTakingPage.questionLocator(), activeQuestion().question)

    const answers = activeQuestion().answers
    const answerLocators = world.quizTakingPage.answersLocator()

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, { answer }] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
})

When('I answer {string}', async (answerList: string) => {
    const answers = answerList.split(',').map(answer => answer.trim())
    for (const answer of answers) {
        await world.quizTakingPage.selectAnswer(answer)
    }
    await world.quizTakingPage.submit()
})

Then('I see feedback {string}', async feedback => {
    await expectTextToBe(world.quizTakingPage.feedbackLocator(), feedback)
})

Then('I see the answer explanation {string}', async answerExplanation => {
    await expectTextToBe(world.quizTakingPage.answerExplanationLocator(), answerExplanation)
})

Then('I see the question explanation', async () => {
    await expectTextToBe(world.quizTakingPage.questionExplanationLocator(), activeQuestion().explanation)
})
