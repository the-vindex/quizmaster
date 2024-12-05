import { Before, Given } from '@cucumber/cucumber'
import { type TableOf, worldAs } from './common.ts'
import type { Question } from './question.ts'
import { CreateQuestionPage } from '../pages'

type AnswerRaw = [string, '*' | '', string]

interface CreateQuestionWorld {
    createQuestionPage: CreateQuestionPage
    questionWip: Question
    bookmarks: Record<string, Question>
    activeBookmark: string
}

const world = worldAs<CreateQuestionWorld>()

Before(() => {
    world.createQuestionPage = new CreateQuestionPage(world.page)
    world.bookmarks = {}
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
