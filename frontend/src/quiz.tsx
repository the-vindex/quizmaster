import { createSignal, For, onMount, Show } from 'solid-js'
import { useParams } from '@solidjs/router'
import type { QuizQuestion } from 'model/quiz-question.ts'
import { preventDefault } from 'helpers.ts'

const Feedback = (correct: boolean) => <p class="feedback">{correct ? 'Correct!' : 'Incorrect!'}</p>

const Question = ({ question, answers }: QuizQuestion) => {
    const [selectedAnswer, setSelectedAnswer] = createSignal<string | null>(null)
    const isCorrect = () => selectedAnswer() === 'Paris'

    const [submitted, setSubmitted] = createSignal(false)
    const submit = preventDefault(() => setSubmitted(true))

    const selectAnswer = (answer: string) => () => setSelectedAnswer(answer)

    const Answer = (answer: string) => (
        <li>
            <input type={'radio'} name={'answer'} value={answer} onClick={selectAnswer(answer)} />
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
            <Show when={submitted()} children={Feedback(isCorrect())} keyed />
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
