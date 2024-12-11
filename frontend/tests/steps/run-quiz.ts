import { Before, Given, When } from '@cucumber/cucumber'
import { expectTextToContain, worldAs } from './common.ts'
import { QuizRun } from '../pages'

interface QuizRunWorld {
    QuizRunPages: QuizRun
}

const world = worldAs<QuizRunWorld>()
const IntroHeader = 'Welcome to quiz'
const IntroDescriptionPart1 =
    'Už jste někdy slyšeli o Test Driven Developmentu nebo Trunk-Based Developmentu? Používáte techniky jako Specification by Example či Pair Programming? Případně další trendy v software engineeringu?'
const IntroDescriptionPart2 =
    'Vyzkoušejte si své znalosti! Ale nebude to jednoduché. Tento test si klade za cíl podívat se na témata zábavnou formou, tedy s humorem a odlehčením. Výsledné score není až tak podstatné, důležité je zúčastnit se!'
const ButtonText = 'Start the quiz'

Before(() => {
    world.QuizRunPages = new QuizRun(world.page)
})

Given('I create a new quiz {string}', async (quizName: string) => {
    await world.QuizRunPages.goto()
    await world.QuizRunPages.CreateQuizInputLocator().type(quizName)
    await world.QuizRunPages.PickItalyLocator().click()
    await world.QuizRunPages.PickFranceLocator().click()
    await world.QuizRunPages.CreateQuizButtonLocator().click()
    // below line is failing and unable to see why, another group can check and fix
    await world.QuizRunPages.GoToQuizRunLocator().click()
})

Given('I am on the Intro page of quiz', async () => {
    await expectTextToContain(world.QuizRunPages.HeaderLocator(), IntroHeader)
    await expectTextToContain(world.QuizRunPages.DescriptionLocatorPart1(), IntroDescriptionPart1)
    await expectTextToContain(world.QuizRunPages.DescriptionLocatorPart2(), IntroDescriptionPart2)
    await expectTextToContain(world.QuizRunPages.ButtonLocator(), ButtonText)
})

When('I start the quiz', async () => {
    await world.QuizRunPages.startQuiz()
})
