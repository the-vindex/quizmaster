import type { QuizQuestion } from '../../model/quiz-question.ts'
import { createMemo, createSignal, For, Show } from 'solid-js'
import { preventDefault } from '../../helpers.ts'
import * as QuestionService from '../../services/QuizQuestionService.ts'
import { isMultipleAnswersCorrect, type MultipleAnswerResult } from '../../services/QuizQuestionService.ts'
import { transformObjectToArray } from '../../utils/transformObjectToArray.ts'
import { QuestionExplanation } from './explanation/Explanation.tsx'
import { Feedback } from './feedback/Feedback.tsx'
import './questionForm.css'
import { Answer, type UserAnswer } from './answer/Answer.tsx'

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
    //const [_, setExplanationIdx] = createSignal<number | null>(null)
    const [answersRequiringFeedback, setAnswersRequiringFeedback] = createSignal<number[]>([])

    const [submitted, setSubmitted] = createSignal(false)

    const isMultiple = correctAnswers.length > 1

    const submitSingle = preventDefault(async () => {
        const selectedAnswerIdx = selectedAnswer()
        if (selectedAnswerIdx === null) return
        QuestionService.isAnswerCorrect(id, selectedAnswerIdx).then(isCorrect => {
            setSubmitted(true)
            setIsAnswerCorrect(isCorrect)

            setAnswersRequiringFeedback(isCorrect ? [] : [selectedAnswerIdx])
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
        setSubmitted(false)
        if (isMultiple) {
            setSelectedAnswers(prevState => ({
                ...prevState,
                [index]: value,
            }))
        } else {
            setSelectedAnswer(index)
        }
    }

    return (
        <form onSubmit={isMultiple ? submitMultiple : submitSingle}>
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
                                isMultiple={isMultiple}
                                handleAnswerChange={handleAnswerChange}
                                isFeedbackRequired={isFeedbackRequired}
                                isSubmitted={submitted}
                                selectedIdx={selectedAnswer}
                            />
                        )
                    }}
                </For>
            </ul>
            <div class="btn-row">
                <input type="submit" class="submit-btn" value={'Submit'} />
            </div>
            <Show when={submitted()} children={Feedback(isAnswerCorrect())} keyed />
            <Show when={submitted()} children={QuestionExplanation(questionExplanation)} />
        </form>
    )
}
