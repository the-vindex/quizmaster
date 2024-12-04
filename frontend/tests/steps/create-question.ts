import { Before, Given, Then, When } from '@cucumber/cucumber'
import { expectTextToBe, type TableOf, worldAs } from './common.ts'
import CreateQuestionPage from '../pages/question-creation-page.ts'

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
    questionWip: Question
    bookmarks: Record<string, Question>
    activeBookmark: string
}

const world = worldAs<QuizQuestionWorld>()

Before(() => {
    world.createQuestionPage = new CreateQuestionPage(world.page)
})

Given('a question {string}', async (question: string) => {
    await world.createQuestionPage.goto()
    await world.createQuestionPage.enterQuestion(question)
    world.questionWip = { url: '', question, answers: [], explanation: '' }
})

Given('with answers:', async (answerRawTable: TableOf<AnswerRaw>) => {
    const raw = answerRawTable.raw()
    for (let i = 0; i < raw.length; i++) {
        const [answer, correct, explanation] = raw[i]
        const isCorrect = correct === '*'
        await world.createQuestionPage.enterAnswer(i, answer, isCorrect, explanation)
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

Then('I see the question', async () => {
    await expectTextToBe(world.page.locator('h1'), world.bookmarks[world.activeBookmark].question)
})
