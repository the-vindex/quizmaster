import type { Quiz, SingleQuiz } from '../model/quiz-question.ts'
import { fetchJson } from '../api.ts'

export const createQuiz = async (quizObj: Quiz) =>
    await fetchJson<number>('/api/quiz', {
        body: JSON.stringify(quizObj),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
export const getQuizMaster = async (quizId: number) => await fetchJson<SingleQuiz>(`/api/quiz/${quizId}`)
