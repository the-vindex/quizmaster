import { type Accessor, type Component, Show } from 'solid-js'
import { Explanation } from '../explanation/Explanation.tsx'

export type UserAnswer = {
    index: number
    value: boolean
}

export type AnswerProps = {
    answer: string // Adjust type based on the actual answer object
    idx: number
    explanation: string
    isFeedbackRequired: Accessor<boolean>
    isSubmitted: Accessor<boolean>
    isMultiple: boolean
    handleAnswerChange: (value: UserAnswer) => void
    selectedIdx: Accessor<number | null>
}

export const Answer: Component<AnswerProps> = ({
    answer,
    idx,
    explanation,
    isMultiple,
    isFeedbackRequired,
    handleAnswerChange,
    isSubmitted,
    selectedIdx,
}) => {
    const answerId: string = `answer-${idx}`

    const handleCheckboxChange = (event: InputEvent) => {
        const { checked } = event.target as HTMLInputElement
        handleAnswerChange({
            index: idx,
            value: checked,
        })
    }

    const handleRadioChange = () => {
        handleAnswerChange({
            index: idx,
            value: true,
        })
    }
    //<!--checked={selectedAnswers()?.[idx]}-->
    if (isMultiple) {
        return (
            <li class="answerOption">
                <input type={'checkbox'} name={`${idx}`} id={answerId} value={answer} onInput={handleCheckboxChange} />
                <label for={answerId}>
                    {answer}
                    <Show
                        when={isSubmitted()}
                        children={Explanation(() => !isFeedbackRequired(), explanation, isFeedbackRequired)}
                        keyed
                    />
                </label>
            </li>
        )
    }

    return (
        <li>
            <input type={'radio'} name={'answer'} id={answerId} value={answer} onClick={handleRadioChange} />
            <label for={answerId}>
                {answer}
                <Show
                    when={isSubmitted() && selectedIdx() === idx}
                    children={Explanation(
                        () => !isFeedbackRequired(),
                        explanation,
                        () => true,
                    )}
                    keyed
                />
            </label>
        </li>
    )
}
