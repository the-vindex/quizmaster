import { Before, Then, When } from '@cucumber/cucumber'
import { expectTextToBe, expectThatIsVisible, worldAs } from './common.ts'
import { QuizResultPage } from '../pages/quiz-result-page.ts'

interface CreateQuizWorld {
    quizResultPage: QuizResultPage
    id: number
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

Then('I see score', async () => {
    await expectThatIsVisible(world.quizResultPage.scoreLocator())
})
