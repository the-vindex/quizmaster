import { Given, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe, type TableOf, type World } from './common'

type AnswerRaw = [string]
type Answers = string[]

const toAnswers = (raw: AnswerRaw[]): Answers => raw.map(([answer]) => answer)

Given('I visit the quiz-taking page', async function (this: World) {
    await this.page.goto('/quiz/1')
})

Then('I should see the question {string}', async function (this: World, question: string) {
    const questionLocator = this.page.locator('h1')
    await expectTextToBe(questionLocator, question)
})

Then('I should see the answers', async function (this: World, table: TableOf<AnswerRaw>) {
    const answers = toAnswers(table.raw())
    const answerLocators = this.page.locator('li')

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, answer] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
})
