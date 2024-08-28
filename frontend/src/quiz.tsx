import { createSignal, For, onMount, Show } from 'solid-js'
import { QuizQuestion } from './model/quiz-question.ts'
import { useParams } from '@solidjs/router'

const Answer = (answer: string) =>
    <li>{ answer }</li>

const Question = ({ question, answers }: QuizQuestion) => <>
    <h1>{ question }</h1>
    <ul>
        <For each={ answers } children={ Answer }/>
    </ul>
</>

export const Quiz = () => {
    const params = useParams()
    const [quizQuestion, setQuizQuestion] = createSignal<QuizQuestion | null>(null)

    onMount(async () => {
        const response = await fetch(`/api/quiz-question/${params.id}`)
        const data = await response.json()
        setQuizQuestion(data)
    })

    return <Show when={ quizQuestion() } children={ Question } keyed/>
}
