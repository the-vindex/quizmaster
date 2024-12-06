import type { QuizQuestion } from '../../model/quiz-question.ts'
import { type Accessor, type Component, createMemo, createSignal, For, Show } from 'solid-js'
import { preventDefault } from '../../helpers.ts'
import * as QuestionService from '../../services/QuizQuestionService.ts'
import { isMultipleAnswersCorrect, type MultipleAnswerResult } from '../../services/QuizQuestionService.ts'
import { transformObjectToArray } from '../../utils/transformObjectToArray.ts'
import { Explanation, QuestionExplanation } from './explanation/Explanation.tsx'
import { Feedback } from './feedback/Feedback.tsx'
import './questionForm.css'

/**
 * TODO Merge with V1, not enough of SolidJS knowledge to do so now.
 * Thanks and sorry.
 */
export const QuestionFormV2 = ({
    id,
    question,
    answers,
    explanations,
    correctAnswers,
    questionExplanation,
}: QuizQuestion) => {
    const [selectedAnswer, setSelectedAnswer] = createSignal<number | null>(null)
    const [selectedAnswers, setSelectedAnswers] = createSignal<{ [key: string]: boolean } | Record<string, boolean>>({})
    const [isAnswerCorrect, setIsAnswerCorrect] = createSignal(false)
    //const [setExplanation] = createSignal<string | ''>('')
    const [explanationIdx, setExplanationIdx] = createSignal<number | null>(null)
    const [answersRequiringFeedback, setAnswersRequiringFeedback] = createSignal<number[]>([])

    const [submitted, setSubmitted] = createSignal(false)

    const isMultiple = correctAnswers.length > 1

    const submit = preventDefault(async () => {
        const selectedAnswerIdx = selectedAnswer()
        if (selectedAnswerIdx === null) return
        QuestionService.isAnswerCorrect(id, selectedAnswerIdx).then(isCorrect => {
            setSubmitted(true)
            setIsAnswerCorrect(isCorrect)
            //setExplanation(explanations[selectedAnswerIdx])
            setExplanationIdx(selectedAnswerIdx)
        })
    })

    const submitMultiple = preventDefault(async () => {
        if (Object.keys(selectedAnswers()).length === 0) return

        const payload = transformObjectToArray(selectedAnswers())

        isMultipleAnswersCorrect(id, payload).then((result: MultipleAnswerResult) => {
            setSubmitted(true)

            setIsAnswerCorrect(result.questionAnsweredCorrectly)
            setAnswersRequiringFeedback(result.answersRequiringFeedback)
        })
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
            <h1>{question}</h1>
            <ul>
                <For each={answers}>
                    {(answer, idx) => {
                        const isFeedbackRequired = createMemo(() => answersRequiringFeedback().some(id => id === idx()))
                        return (
                            <Answer
                                answer={answer}
                                idx={idx()}
                                explanation={explanations ? explanations[idx()] : 'not defined'}
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
            <Show when={submitted()} children={Feedback(isAnswerCorrect())} keyed />
            <Show when={submitted()} children={QuestionExplanation(questionExplanation)} />
        </form>
    )
}
