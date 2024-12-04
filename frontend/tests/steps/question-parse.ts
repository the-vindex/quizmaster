export type AnswerRaw = [string, string, string]
export type Answers = string[]
export type Explanations = string[]

export const toAnswers = (raw: AnswerRaw[]): Answers => raw.map(([answer]) => answer)

export const toCorrectAnswer = (raw: AnswerRaw[]): number => raw.findIndex(([, correct]) => correct === 'correct')

export const toCorrectAnswers = (raw: AnswerRaw[]): number[] => {
    const correctIndexes: number[] = []
    raw.forEach(([, correct], index) => {
        if (correct === 'correct') {
            correctIndexes.push(index)
        }
    })
    return correctIndexes
}

export const toExplanations = (raw: AnswerRaw[]): Explanations => raw.map(([, , explanation]) => explanation)
