import {Then, When} from '@cucumber/cucumber'
import {expect} from '@playwright/test'
import {worldAs} from './common.ts'
import QuizTakingPage from '../pages/quiz-taking-page'

interface MultipleChoiceWorld {
    quizTakingPage: QuizTakingPage
}

const world = worldAs<MultipleChoiceWorld>()

Then('quiz taker is on the quiz page', async () => {
    const pageTitle = await world.quizTakingPage.getTitle()
    expect(pageTitle).toBe('Take Quiz')
})

Then('quiz taker sees question with multiple choice', async () => {
    const questionType = await world.quizTakingPage.getQuestionType()
    expect(questionType).toBe('multiple choice')
})

When('quiz taker chooses {string}', async (answers: string) => {
    const answerList = answers.split(',').map(answer => answer.trim())
    for (const answer of answerList) {
        await world.quizTakingPage.selectAnswer(answer)
    }
})

When('quiz taker clicks on submit button', async () => {
    await world.quizTakingPage.submit()
})

Then('quiz taker sees the {string}', async (result: string) => {
    const feedback = await world.quizTakingPage.getFeedback()
    expect(feedback).toContain(result)
})
