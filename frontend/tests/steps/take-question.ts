import { Before, type DataTable, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe, expectThatIsNotVisible, worldAs } from './common.ts'
import type { Question } from './question.ts'
import { TakeQuestionPage } from '../pages'

interface TakeQuestionWorld {
    quizTakingPage: TakeQuestionPage
    bookmarks: Record<string, Question>
    activeBookmark: string
}

const world = worldAs<TakeQuestionWorld>()
const activeQuestion = () => world.bookmarks[world.activeBookmark]

Before(() => {
    world.quizTakingPage = new TakeQuestionPage(world.page)
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

Then(/^I see the answer explanations for answers$/, async (data: DataTable) => {
    console.log(data)

    for (const row of data.rows()) {
        console.log(row)
        console.log(row[0])
        if (row[1]) await expectTextToBe(world.quizTakingPage.answerExplanationLocatorForAnswer(row[0]), row[1])
        else {
            console.log(`${row[0]} should not be there`)
            await expectThatIsNotVisible(world.quizTakingPage.answerExplanationLocatorForAnswer(row[0]))
        }
    }
})
