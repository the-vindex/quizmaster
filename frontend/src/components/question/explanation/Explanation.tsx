import { type Accessor, Show } from 'solid-js'

export const Explanation = (correct: Accessor<boolean>, explanation: string, showExplanation: Accessor<boolean>) => {
    return (
        <span>
            {' '}
            <span class={correct() ? 'greenSpan' : 'redSpan'}>{correct() ? 'Correct!' : 'Incorrect!'}</span> &nbsp;
            <Show
                when={showExplanation()}
                children={
                    <>
                        {'Explanation: '}
                        <span class="explanation">{explanation}</span>
                    </>
                }
                keyed
            />
        </span>
    )
}

export const QuestionExplanation = (questionExplanation: string) => (
    <p class="questionExplanation">{questionExplanation}</p>
)
