import './quiz.scss'

import { type Component, createSignal, For, onMount, Show } from 'solid-js'
import { useParams } from '@solidjs/router'

import type { QuizQuestion } from 'model/quiz-question.ts'
import { preventDefault } from 'helpers.ts'
import { transformObjectToArray } from './utils/transformObjectToArray.ts'
import { getQuestion, isMultipleAnswersCorrect, type MultipleAnswerResult } from './services/QuizQuestionService.ts'
import * as QuestionService from './services/QuizQuestionService.ts'

const Feedback = (correct: boolean) => <p class="feedback">{correct ? 'Correct!' : 'Incorrect!'}</p>

const Explanation = (correct: boolean, explanation: string) => {
    return (
        <span>
            {' '}
            <span class={correct ? 'greenSpan' : 'redSpan'}>{correct ? 'Correct!' : 'Incorrect!'}</span> <br />
            {'Explanation: '}
            <span class="explanation">{explanation}</span>
        </span>
    )
}

const QuestionExplanation = (questionExplanation: string) => <p class="questionExplanation">{questionExplanation}</p>

const Question = ({ id, question, answers, explanations, correctAnswers, questionExplanation }: QuizQuestion) => {
    const [selectedAnswer, setSelectedAnswer] = createSignal<number | null>(null)
    const [selectedAnswers, setSelectedAnswers] = createSignal<{ [key: string]: boolean } | Record<string, boolean>>({})
    const [isAnswerCorrect, setIsAnswerCorrect] = createSignal(false)
    //const [setExplanation] = createSignal<string | ''>('')
    const [explanationIdx, setExplanationIdx] = createSignal<number | null>(null)

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
    }

    const Answer: Component<AnswerProps> = ({ answer, idx, explanation }) => {
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
                            when={submitted() /*&& (isFeedbackRequired())*/}
                            children={Explanation(false, explanation /*explanations[idx()]*/)}
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
                    {(answer, idx) => <Answer answer={answer} idx={idx()} explanation={explanations[idx()]} />}
                </For>
            </ul>
            <input type="submit" value={'Submit'} />
            <Show when={submitted()} children={Feedback(isAnswerCorrect())} keyed />
            <Show when={submitted()} children={QuestionExplanation(questionExplanation)} />
        </form>
    )
}

export const Quiz = () => {
    const params = useParams()
    const questionId = Number.parseInt(params.id)

    const [quizQuestion, setQuizQuestion] = createSignal<QuizQuestion | null>(null)

    onMount(async () => setQuizQuestion(await getQuestion(questionId)))

    return <Show when={quizQuestion()} children={Question} keyed />
}
