import { type Accessor, createSignal, For, onMount, Show } from 'solid-js'
import { useParams } from '@solidjs/router'
import type { QuizQuestion } from 'model/quiz-question.ts'
import { preventDefault } from 'helpers.ts'

const Feedback = (correct: boolean) => <p class="feedback">{correct ? 'Correct!' : 'Incorrect!'}</p>

const Question = ({ id, question, answers }: QuizQuestion) => {
    const [selectedAnswer, setSelectedAnswer] = createSignal<number | null>(null)
    const [isAnswerCorrect, setIsAnswerCorrect] = createSignal(false)

    const [submitted, setSubmitted] = createSignal(false)

    const submit = preventDefault(() => {
        if (selectedAnswer() === null) return
        setSubmitted(true)
        fetch(`/api/quiz-question/${id}/answer/${selectedAnswer()}`)
            .then((response) => response.json())
            .then((data) => setIsAnswerCorrect(data))
    })

    const selectAnswer = (answerIdx: number) => () => setSelectedAnswer(answerIdx)

    const Answer = (answer: string, idx: Accessor<number>) => (
        <li>
            <input type={'radio'} name={'answer'} value={answer} onClick={selectAnswer(idx())} />
            {answer}
        </li>
    )

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
    const [quizQuestion, setQuizQuestion] = createSignal<QuizQuestion | null>(null)

    onMount(async () => {
        const response = await fetch(`/api/quiz-question/${params.id}`)
        const data = await response.json()
        setQuizQuestion(data)
    })

    return <Show when={quizQuestion()} children={Question} keyed />
}
