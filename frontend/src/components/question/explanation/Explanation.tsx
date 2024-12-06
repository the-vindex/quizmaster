export const Explanation = (correct: boolean, explanation: string) => {
    return (
        <span>
            {' '}
            <span class={correct ? 'greenSpan' : 'redSpan'}>{correct ? 'Correct!' : 'Incorrect!'}</span> <br />
            {'Explanation: '}
            <span class="explanation">{explanation}</span>
        </span>
    )
}

export const QuestionExplanation = (questionExplanation: string) => (
    <p class="questionExplanation">{questionExplanation}</p>
)
