export interface QuizQuestion {
    readonly id: number
    readonly question: string
    readonly answers: readonly string[]
    readonly explanations: readonly string[]
    readonly quizType: string
    readonly questionExplanation: string
}

export interface Quiz {
    readonly name: string
    readonly answerIds: number[]
}
