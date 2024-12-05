import { Before, Then, When, Given } from '@cucumber/cucumber'
import { expectTextToBe, expectThatIsVisible, worldAs } from './common.ts'
import { QuizResultPage } from '../pages/quiz-result-page.ts'
import { expect, type Locator } from '@playwright/test'

interface CreateQuizWorld {
    quizResultPage: QuizResultPage
    id: number
    table: Locator
}

const world = worldAs<CreateQuizWorld>()

Before(() => {
    world.quizResultPage = new QuizResultPage(world.page)
})

When('I finish quiz', async () => {
    await world.quizResultPage.goto()
})

Then('I see the page identifier', async () => {
    await expectTextToBe(world.quizResultPage.quizLocator(), 'Quiz Result Page')
})

Then('I see feedback summary', async () => {
    await expectThatIsVisible(world.quizResultPage.feedbackLocator())
})

Then('I see quiz name', async () => {
    await expectThatIsVisible(world.quizResultPage.quizTitle())
})

Then('I see score', async () => {
    await expectThatIsVisible(world.quizResultPage.scoreLocator())
})

Given('I am on the results page', async function () {
    await this.quizResultPage.goto() // Replace with your actual URL
})

When('I view the results table', async () => {
    world.table = world.quizResultPage.resultsTableLocator()
})

Then('the table should have the following columns:', async function (dataTable) {
    const expectedColumns = dataTable.raw().flat()

    const actualColumns = await this.table.locator('th').allTextContents()

    expect(actualColumns).toEqual(expectedColumns)
})

Then('the table should display the following data:', async dataTable => {
    const hashes = dataTable.hashes()

    for (let i = 0; i < hashes.length; i++) {
        const dataRow = Object.values(hashes[i])
        const dataRowString = dataRow.join('').replaceAll(/\s/g, '')

        const codeRow = await world.table
            .locator('tr')
            .nth(i + 1)
            .innerText()
        const codeRowString = codeRow.replaceAll(/\s/g, '')

        expect(dataRowString).toEqual(codeRowString)
    }
})
