import type { QuizQuestion } from '../model/quiz-question.ts'
import { fetchJson } from '../utils/apiUtils.ts'

export const getQuestion = async (questionId: number) =>
    await fetchJson<QuizQuestion>(`/api/quiz-question/${questionId}`)

export const isAnswerCorrect = async (questionId: number, answerIdx: number) =>
    await fetchJson<boolean>(`/api/quiz-question/${questionId}/answer/${answerIdx}`)

type MultipleAnswerResult = {
    questionAnsweredCorrectly: boolean
    wrongAnswers: number[]
}

export const isMultipleAnswersCorrect = async (questionId: number, answersList: number[]) => {
    return await fetchJson<MultipleAnswerResult>(`/api/quiz-question/${questionId}/answerv3`, {
        method: 'POST',
        body: JSON.stringify(answersList),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const getQuestions = async () => await fetchJson<QuizQuestion[]>('/api/quiz-question/all')
