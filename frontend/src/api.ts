import type { Quiz, QuizQuestion } from './model/quiz-question.ts'

const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(url, init)
    return (await response.json()) as T
}

export const getQuestion = async (questionId: number) =>
    await fetchJson<QuizQuestion>(`/api/quiz-question/${questionId}`)

export const isAnswerCorrect = async (questionId: number, answerIdx: number) =>
    await fetchJson<boolean>(`/api/quiz-question/${questionId}/answer/${answerIdx}`)

export const isMultipleAnswersCorrect = async (questionId: number, answersList: number[]) => {
    return await fetchJson<boolean>(`/api/quiz-question/${questionId}/answer`, {
        method: 'POST',
        body: JSON.stringify(answersList),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
export const getQuestions = async () => await fetchJson<QuizQuestion[]>('/api/quiz-question/all')

export const createQuiz = async (quizObj: Quiz) =>
    await fetchJson<number>('/api/quiz', {
        body: JSON.stringify(quizObj),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
