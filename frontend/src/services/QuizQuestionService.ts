import type { QuizQuestion } from '../model/quiz-question.ts'
import { fetchJson } from '../utils/apiUtils.ts'

export const getQuestion = async (questionId: number | string) =>
    await fetchJson<QuizQuestion>(`/api/quiz-question/${questionId}`)

export const isAnswerCorrect = async (questionId: number, answerIdx: number) =>
    await fetchJson<boolean>(`/api/quiz-question/${questionId}/answer/${answerIdx}`)

export type MultipleAnswerResult = {
    questionAnsweredCorrectly: boolean
    answersRequiringFeedback: number[]
}

export const isMultipleAnswersCorrect = async (questionId: number, answersList: number[]) => {
    return await fetchJson<MultipleAnswerResult>(`/api/quiz-question/${questionId}/answer`, {
        method: 'POST',
        body: JSON.stringify(answersList),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const getQuestions = async () => await fetchJson<QuizQuestion[]>('/api/quiz-question/all')

export const setAnswer = async (runId: string, questionId: string | number, answers: number[]) =>
    await fetchJson(`/api/quizRun/${runId}/question/${questionId}/answer`, {
        method: 'POST',
        body: JSON.stringify({ answerIds: answers }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
