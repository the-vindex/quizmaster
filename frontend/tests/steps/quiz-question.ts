import { Before, Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectInputToBe, expectTextToBe, expectThatIsVisible, type TableOf, worldAs } from './common.ts'
import QuizTakingPage from '../pages/quiz-taking-page'
import QuestionCreationPage from '../pages/question-creation-page'

interface QuizQuestionData {
    readonly question: string
    readonly answers: readonly string[]
    readonly correctAnswer: number
    readonly explanations: readonly string[]
}

interface QuizQuestion {
    readonly quizQuestionId: number
    readonly quizQuestion: QuizQuestionData
}

type AnswerRaw = [string, string, string]
type Answers = string[]
type Explanations = string[]

const toAnswers = (raw: AnswerRaw[]): Answers => raw.map(([answer]) => answer)
const toCorrectAnswer = (raw: AnswerRaw[]): number => raw.findIndex(([, correct]) => correct === 'correct')
const toExplanations = (raw: AnswerRaw[]): Explanations => raw.map(([, , explanation]) => explanation)

interface QuizQuestionWorld {
    questionCreationPage: QuestionCreationPage
    quizTakingPage: QuizTakingPage
    bookmarks: Record<string, QuizQuestion>
    activeBookmark: string
}

const world = worldAs<QuizQuestionWorld>()

const saveQuizQuestion = async (quizQuestion: QuizQuestionData) =>
    await fetch('http://localhost:8080/api/quiz-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizQuestion),
    })
        .then(response => response.text())
        .then(Number.parseFloat)

const bookmarkQuizQuestion = async (bookmark: string, quizQuestion: QuizQuestionData) => {
    world.bookmarks[bookmark] = {
        quizQuestionId: await saveQuizQuestion(quizQuestion),
        quizQuestion,
    }
}

const activeQuizQuestion = () => world.bookmarks[world.activeBookmark].quizQuestion

Before(() => {
    world.quizTakingPage = new QuizTakingPage(world.page)
    world.questionCreationPage = new QuestionCreationPage(world.page)
    world.bookmarks = {}
})

Given(
    'a quiz question {string} bookmarked as {string} with answers',
    async (question: string, bookmark: string, answerRawTable: TableOf<AnswerRaw>) => {
        await bookmarkQuizQuestion(bookmark, {
            question,
            answers: toAnswers(answerRawTable.raw()),
            correctAnswer: toCorrectAnswer(answerRawTable.raw()),
            explanations: toExplanations(answerRawTable.raw()),
        })
    },
)

When('I visit the {string} quiz-taking page', async (bookmark: string) => {
    world.activeBookmark = bookmark
    const quizId = world.bookmarks[bookmark].quizQuestionId
    console.log(`Navigating to the quiz-taking page: ${quizId}`)
    await world.quizTakingPage.goto(quizId)
})

When('I select the answer {string}', async (answerList: string) => {
    for (const answer of answerList.split(',')) {
        await world.quizTakingPage.selectAnswer(answer)
    }
})

When('I submit the quiz', async () => {
    await world.quizTakingPage.submit()
})

Then('I should see the question', async () => {
    const questionLocator = world.quizTakingPage.questionLocator()
    await expectTextToBe(questionLocator, activeQuizQuestion().question)
})

Then('I should see the answers', async () => {
    const answers = activeQuizQuestion().answers
    const answerLocators = world.quizTakingPage.answersLocator()

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, answer] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
})

Then('I should see {string}', async (feedback: string) => {
    const feedbackLocator = world.quizTakingPage.feedbackLocator()
    await expectTextToBe(feedbackLocator, feedback)
})

Then('I should see the explanation {string}', async (explanation: string) => {
    const explanationLocator = world.quizTakingPage.explanationLocator()
    await expectTextToBe(explanationLocator, ` ${explanation}`)
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
        await world.questionCreationPage.enterAnswer(i, toAnswers(raw)[i], correctIndex === i)
    }
})

Then('I submit question', async () => {
    await world.questionCreationPage.clickSubmitButton()
})

Then('I received question link', async () => {
    const linkLocator = world.questionCreationPage.linkLocator()
    await expectThatIsVisible(linkLocator)
})

Then('I should see question explanation {string}', async (questionExplanation: string) => {
    const questionExplanationLocator = world.quizTakingPage.questionExplanationLocator()
    await expectTextToBe(questionExplanationLocator, questionExplanation)
})
