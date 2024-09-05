import { Before, Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { worldAs } from './common.ts'
import QuizCreationPage from '../pages/quiz-creation-page'
import QuizTakingPage from '../pages/quiz-taking-page'

interface QuizMakerWorld {
    quizCreationPage: QuizCreationPage
    quizTakingPage: QuizTakingPage
    quizId: string
}

const world = worldAs<QuizMakerWorld>()

Before(() => {
    world.quizCreationPage = new QuizCreationPage(world.page)
    world.quizTakingPage = new QuizTakingPage(world.page)
})

Given('quiz maker opens a quiz creation page', async () => {
    await world.quizCreationPage.goto()
})

Then('quiz maker is on the quiz creation page', async () => {
    const pageTitle = await world.quizCreationPage.getTitle()
    expect(pageTitle).toBe('Quiz Creation')
})

When('quiz maker chooses id from the table', async () => {
    await world.quizCreationPage.selectRandomQuizId()
})

// Then('quiz maker sees that expected check boxes are selected', async () => {
//     const selectedIds = await world.quizCreationPage.getSelectedIds()
//     expect(selectedIds.length).toBeGreaterThan(0) // Должны быть выбраны какие-то чекбоксы
// })

When('quiz maker submits the quiz', async () => {
    await world.quizCreationPage.submitQuiz()
})

Then('quiz maker sees a correct list of the questions', async () => {
    const questions = await world.quizCreationPage.getSubmittedQuestions()
    expect(questions.length).toBeGreaterThan(0) // Вопросы должны быть отправлены
})

Then('link for the quiz taker is present', async () => {
    const quizLink = await world.quizCreationPage.getQuizLink()
    expect(quizLink).toContain('/quiz/')
})

When('quiz taker clicks the link', async () => {
    const quizLink = await world.quizCreationPage.getQuizLink()
    if (quizLink) {
        await world.quizTakingPage.gotoByLink(quizLink)
    } else {
        throw new Error('Quiz link is null')
    }
})

Then('quiz taker is on the quiz page', async () => {
    const currentUrl = await world.quizTakingPage.getUrl()
    const urlPattern = /^http:\/\/localhost:(5173|8080)\/quiz\/\d+$/
    expect(currentUrl).toMatch(urlPattern)
})

Then('quiz taker sees a correct list of the questions', async () => {
    const questions = await world.quizTakingPage.getQuestions()
    expect(questions.length).toBeGreaterThan(0)
})

When('quiz maker does not choose id from the table', async () => {
    await world.quizCreationPage.clearSelectedIds()
})
//
// Then('quiz maker sees that expected check boxes are not selected', async () => {
//     const selectedIds = await world.quizCreationPage.getSelectedIds()
//     expect(selectedIds.length).toBe(0) // Должно быть 0 выбранных чекбоксов
// })

Then('quiz maker sees a validation error', async () => {
    const errorText = await world.quizCreationPage.getValidationError()
    expect(errorText).toBe('You must select at least one question.')
})
