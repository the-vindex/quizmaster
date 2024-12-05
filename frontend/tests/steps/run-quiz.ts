import { Before, Given, When } from '@cucumber/cucumber'
import { expectTextToBe, worldAs } from './common.ts'
import { QuizIntroPage } from '../pages'

interface QuizIntroWorld {
    QuizIntroPage: QuizIntroPage
    QuizName: string
    QuizId: number
}

const world = worldAs<QuizIntroWorld>()

const quizNameToIdMap: { [key: string]: number } = {
    'Dummy Quiz Name': 1,
}

Before(() => {
    world.QuizIntroPage = new QuizIntroPage(world.page, world.QuizName)
})

Given('I am on the Intro page of {string} quiz', async (quizName: string) => {
    world.QuizId = quizNameToIdMap[quizName]
    await world.QuizIntroPage.goto()
    await expectTextToBe(world.QuizIntroPage.quizLocator(), quizName)
})

When('When I start the quiz', async () => {
    await world.QuizIntroPage.startQuiz()
})
