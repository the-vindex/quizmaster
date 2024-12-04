import { Before, Then, When } from '@cucumber/cucumber'
import { expectInputToBe, expectTextToBe, expectThatIsVisible, type TableOf, worldAs } from './common.ts'
import { type AnswerRaw, toAnswers, toCorrectAnswer, toExplanations } from './question-parse.ts'
import QuestionCreationPage from '../pages/question-creation-page.ts'

interface QuizQuestionWorld {
    questionCreationPage: QuestionCreationPage
}

const world = worldAs<QuizQuestionWorld>()

Before(() => {
    world.questionCreationPage = new QuestionCreationPage(world.page)
})

When('I visit the create question page', async () => {
    await world.questionCreationPage.goto()
})

Then('I should see the create question form', async () => {
    const formLocator = world.questionCreationPage.formLocator()
    await expectThatIsVisible(formLocator)
})

Then('I enter question {string}', async (question: string) => {
    await world.questionCreationPage.enterQuestion(question)
    const questionLocator = world.questionCreationPage.questionLocator()
    await expectInputToBe(questionLocator, question)
})

Then('I enter answers:', async (answerRawTable: TableOf<AnswerRaw>) => {
    const raw = answerRawTable.raw()
    const correctIndex = toCorrectAnswer(raw)
    for (let i = 0; i < raw.length; i++) {
        await world.questionCreationPage.enterAnswer(i, toAnswers(raw)[i], correctIndex === i, toExplanations(raw)[i])
    }
})

Then('I enter general explanation {string}', async (generalExplanation: string) => {
    await world.questionCreationPage.enterGeneralExplanation(generalExplanation)
})

Then('I submit question', async () => {
    await world.questionCreationPage.clickSubmitButton()
})

Then('I received question link', async () => {
    const linkLocator = world.questionCreationPage.linkLocator()
    await expectThatIsVisible(linkLocator)
})

Then('I see warning {string}', async (warningInformation: string) => {
    const linkLocator = world.questionCreationPage.linkLocator()
    await expectTextToBe(linkLocator, warningInformation)
})
