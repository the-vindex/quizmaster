import { type Accessor, type Component, createMemo, createSignal, For, Show } from 'solid-js'
import { preventDefault } from '../../helpers.ts'
import * as QuestionService from '../../services/QuizQuestionService.ts'
import { transformObjectToArray } from '../../utils/transformObjectToArray.ts'
import { Explanation } from './explanation/Explanation.tsx'
import './questionForm.css'
import type { QuizQuestionProps } from '../../model/quiz-question.ts'

/**
 * TODO Merge with V1, not enough of SolidJS knowledge to do so now.
 * Thanks and sorry.
 */
export const QuestionFormV2 = (props: QuizQuestionProps) => {
    const [selectedAnswer, setSelectedAnswer] = createSignal<number | null>(null)
    const [selectedAnswers, setSelectedAnswers] = createSignal<{ [key: string]: boolean } | Record<string, boolean>>({})
    const [isAnswerCorrect] = createSignal(false)
    const [explanationIdx, setExplanationIdx] = createSignal<number | null>(null)
    const [answersRequiringFeedback] = createSignal<number[]>([])

    const [submitted, setSubmitted] = createSignal(false)

    const isMultiple = props.correctAnswers.length > 1

    const submit = preventDefault(async () => {
        const selectedAnswerIdx = selectedAnswer()
        if (selectedAnswerIdx === null) return

        QuestionService.setAnswer(props.quizRunId, props.id, [selectedAnswerIdx])
            .then(() => {
                setSubmitted(true)
                setExplanationIdx(selectedAnswerIdx)
            })
            .then(() => props.onSuccessfulSubmit())
    })

    const submitMultiple = preventDefault(async () => {
        const answers = Object.keys(selectedAnswers())
        if (answers.length === 0) return

        const payload = transformObjectToArray(selectedAnswers())

        QuestionService.setAnswer(props.quizId, props.id, payload)
            .then(() => {
                setSubmitted(true)
            })
            .then(() => props.onSuccessfulSubmit())
    })

    const selectAnswer = (answerIdx: number) => () => {
        setSelectedAnswer(answerIdx)
    }

    const handleCheckboxChange = (event: InputEvent) => {
        const { name, checked } = event.target as HTMLInputElement
        setSelectedAnswers(prevState => ({
            ...prevState,
            [name]: checked,
        }))
    }

    type AnswerProps = {
        answer: string // Adjust type based on the actual answer object
        idx: number
        explanation: string
        isFeedbackRequired: Accessor<boolean>
    }

    const Answer: Component<AnswerProps> = ({ answer, idx, explanation, isFeedbackRequired }) => {
        const answerId: string = `answer-${idx}`

        if (isMultiple) {
            return (
                <li class="answerOption">
                    <input
                        type={'checkbox'}
                        name={`${idx}`}
                        id={answerId}
                        value={answer}
                        checked={selectedAnswers()?.[idx]}
                        onInput={handleCheckboxChange}
                    />
                    <label for={answerId}>
                        {answer}
                        <Show
                            when={submitted() && isFeedbackRequired()}
                            children={Explanation(
                                createMemo(() => false),
                                explanation,
                                isFeedbackRequired,
                            )}
                            keyed
                        />
                    </label>
                </li>
            )
        }

        return (
            <li>
                <input type={'radio'} name={'answer'} id={answerId} value={answer} onClick={selectAnswer(idx)} />
                <label for={answerId}>
                    {answer}
                    <Show
                        when={explanationIdx() === idx}
                        children={Explanation(isAnswerCorrect, explanation, () => true)}
                        keyed
                    />
                </label>
            </li>
        )
    }

    return (
        <form onSubmit={isMultiple ? submitMultiple : submit}>
            <h1>{props.question}</h1>
            <ul>
                <For each={props.answers}>
                    {(answer, idx) => {
                        const isFeedbackRequired = createMemo(() => answersRequiringFeedback().some(id => id === idx()))
                        return (
                            <Answer
                                answer={answer}
                                idx={idx()}
                                explanation={props.explanations ? props.explanations[idx()] : 'not defined'}
                                isFeedbackRequired={isFeedbackRequired}
                            />
                        )
                    }}
                </For>
            </ul>
            <div class="btn-row">
                <button type="submit" class="submit-btn">
                    Submit
                </button>
            </div>
        </form>
    )
}
