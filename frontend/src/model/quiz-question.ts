// TODO refactor optional params
export interface QuizQuestion {
    readonly id: number
    readonly question: string
    readonly answers: readonly string[]
    readonly explanations: readonly string[]
    readonly questionExplanation: string
    readonly correctAnswers: number[]
}

export interface QuizQuestionProps extends QuizQuestion {
    readonly quizId: string
    readonly quizRunId: string
    readonly onSuccessfulSubmit: () => void
}

export interface Quiz {
    readonly name: string
    readonly questionIds: number[]
}

export interface SingleQuestion {
    readonly id: number
    readonly question: string
}

export interface SingleQuiz {
    readonly name: string
    readonly questions: SingleQuestion[]
}
