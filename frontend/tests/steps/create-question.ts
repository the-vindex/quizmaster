import { Before, Given, When, Then, type DataTable } from '@cucumber/cucumber'
import { type TableOf, worldAs, expectTextToBe } from './common.ts'
import type { Question } from './question.ts'
import { CreateQuestionPage } from '../pages'
import { expect } from '@playwright/test'

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

Given('visit create question form', async () => {
    await world.createQuestionPage.goto()
})

When('click submit button', async () => {
    await world.createQuestionPage.submit()
})

Then('{string} message is displayed', async (errorMessage: string) => {
    await expectTextToBe(world.createQuestionPage.questionUrlLocator(), errorMessage)
})

When(/^enter <answer> answers$/, async (answers: DataTable) => {
    for (const answer of answers.rows()) {
        await world.page.fill(`#answer-text-${answer}`, 'Answer1')
    }
})

When('enter <answer> answers:', async function (dataTable) {
    const answers = dataTable.rawTable.slice(1).map((row: string[]) => Number.parseInt(row[0], 10))
    for (const answer of answers) {
        await this.page.fill(`#answer-text-${answer}`, 'Answer1')
    }
})

When('check <correctAnswers> correct answer:', async dataTable => {
    const correctAnswers = dataTable.rawTable.slice(1).map((row: string[]) => Number.parseInt(row[0], 10))
    for (const correctAnswer of correctAnswers) {
        await world.page.check(`#answer-checkbox-${correctAnswer}`)
    }
})

Then('enter question', async () => {
    await world.page.fill('#question-text-area', 'Je toto školení užitečné?')
})

When('mark the question as multiple possible answers', async () => {
    await world.page.click('#multiple-possible-answers')
})

Then('enter <explanations> for answer', async function (dataTable) {
    const explanations = dataTable.rawTable.slice(1).map((row: string[]) => Number.parseInt(row[0], 10))
    for (const explanation of explanations) {
        await this.page.fill(`#answer-explanation-${explanation}`, 'Explanation_1')
    }
})

When('enter general explanation for the entire question', async function () {
    await this.page.fill('#general-explanation', 'Explanation')
})

When('link to the question is created', async () => {
    const linkElement = world.page.locator('#question-link')
    const linkText = await linkElement.textContent()
    expect(linkText).toContain('/question/')
})
