import { createSignal, For, Match, onMount, Show, Switch } from 'solid-js'
import { useParams } from '@solidjs/router'
import type { QuizQuestion } from 'model/quiz-question.ts'
import { preventDefault } from 'helpers.ts'

const Question = ({ question, answers }: QuizQuestion) => {
    const [selectedAnswer, setSelectedAnswer] = createSignal<string | null>(null)
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
            <Show when={submitted()}>
                <Switch>
                    <Match when={selectedAnswer() === 'Paris'}>
                        <p class="feedback">Correct!</p>
                    </Match>
                    <Match when={selectedAnswer() !== 'Paris'}>
                        <p class="feedback">Incorrect!</p>
                    </Match>
                </Switch>
            </Show>
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
