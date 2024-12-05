export interface Answer {
    answer: string
    isCorrect: boolean
    explanation: string
}

export interface Question {
    url: string
    question: string
    answers: Answer[]
    explanation: string
}
