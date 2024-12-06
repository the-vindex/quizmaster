import type { QuizQuestion } from '../../model/quiz-question.ts'
import { type Accessor, type Component, createMemo, createSignal, For, Show } from 'solid-js'
import { preventDefault } from '../../helpers.ts'
import * as QuestionService from '../../services/QuizQuestionService.ts'
import { isMultipleAnswersCorrect, type MultipleAnswerResult } from '../../services/QuizQuestionService.ts'
import { transformObjectToArray } from '../../utils/transformObjectToArray.ts'
import { Explanation, QuestionExplanation } from './explanation/Explanation.tsx'
import { Feedback } from './feedback/Feedback.tsx'

export const QuestionForm = ({
    id,
    question,
    answers,
    explanations,
    correctAnswers,
    questionExplanation,
}: QuizQuestion) => {
    const [selectedAnswer, setSelectedAnswer] = createSignal<number | null>(null)
    const [selectedAnswers, setSelectedAnswers] = createSignal<{ [idx: number]: boolean } | Record<number, boolean>>({})
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

    const handleAnswerChange = (event: UserAnswer) => {
        const { index, value } = event
        if (isMultiple) {
            setSelectedAnswers(prevState => ({
                ...prevState,
                [index]: value,
            }))
        } else {
            setSelectedAnswer(index)
        }
    }

    type UserAnswer = {
        index: number
        value: boolean
    }

    type AnswerProps = {
        answer: string // Adjust type based on the actual answer object
        idx: number
        explanation: string
        isFeedbackRequired: Accessor<boolean>
        isMultiple: boolean
        handleAnswerChange: (value: UserAnswer) => void
    }

    const Answer: Component<AnswerProps> = ({
        answer,
        idx,
        explanation,
        isMultiple,
        isFeedbackRequired,
        handleAnswerChange,
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
                            children={Explanation(false, explanation)}
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
                        when={explanationIdx() === idx}
                        children={Explanation(isAnswerCorrect(), explanation)}
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
                                explanation={explanations[idx()]}
                                isMultiple={isMultiple}
                                handleAnswerChange={handleAnswerChange}
                                isFeedbackRequired={isFeedbackRequired}
                            />
                        )
                    }}
                </For>
            </ul>
            <input type="submit" value={'Submit'} />
            <Show when={submitted()} children={Feedback(isAnswerCorrect())} keyed />
            <Show when={submitted()} children={QuestionExplanation(questionExplanation)} />
        </form>
    )
}
