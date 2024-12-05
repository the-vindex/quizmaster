import type {Quiz, QuizQuestion} from "./quiz-question.ts";

export interface QuizQuestionResult {
    readonly selectedAnswers: number[]
    readonly explanationToShowIds: number[] // indexy do question.explanations[]
    readonly question: QuizQuestion
}

export type QuizRunResult = {
    readonly runId: number
    readonly quizId: number
    readonly quiz: Quiz
    readonly questionResults: QuizQuestionResult[]
}
