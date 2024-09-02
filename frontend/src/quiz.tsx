import './quiz.scss'

import { type Accessor, createSignal, For, onMount, Show } from 'solid-js'
import { useParams } from '@solidjs/router'

import type { QuizQuestion } from 'model/quiz-question.ts'
import * as api from 'api.ts'
import { preventDefault } from 'helpers.ts'

const Feedback = (correct: boolean) => <p class="feedback">{correct ? 'Correct!' : 'Incorrect!'}</p>

const Question = ({ id, question, answers }: QuizQuestion) => {
    const [selectedAnswer, setSelectedAnswer] = createSignal<number | null>(null)
    const [isAnswerCorrect, setIsAnswerCorrect] = createSignal(false)

    const [submitted, setSubmitted] = createSignal(false)

    const submit = preventDefault(async () => {
        const selectedAnswerIdx = selectedAnswer()
        if (selectedAnswerIdx === null) return
        api.isAnswerCorrect(id, selectedAnswerIdx).then(isCorrect => {
            setSubmitted(true)
            setIsAnswerCorrect(isCorrect)
        })
    })

    const selectAnswer = (answerIdx: number) => () => setSelectedAnswer(answerIdx)

    const Answer = (answer: string, idx: Accessor<number>) => {
        const answerId = `answer-${idx()}`
        return (
            <li>
                <input type={'radio'} name={'answer'} id={answerId} value={answer} onClick={selectAnswer(idx())} />
                <label for={answerId}>{answer}</label>
            </li>
        )
    }

    return (
        <form onSubmit={submit}>
            <h1>{question}</h1>
            <ul>
                <For each={answers} children={Answer} />
            </ul>
            <input type="submit" value={'Submit'} />
            <Show when={submitted()} children={Feedback(isAnswerCorrect())} keyed />
        </form>
    )
}

export const Quiz = () => {
    const params = useParams()
    const questionId = Number.parseInt(params.id)

    const [quizQuestion, setQuizQuestion] = createSignal<QuizQuestion | null>(null)

    onMount(async () => setQuizQuestion(await api.getQuestion(questionId)))

    return <Show when={quizQuestion()} children={Question} keyed />
}
