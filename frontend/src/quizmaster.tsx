import './quizmaster.scss'

import { createSignal, For, onMount, Show } from 'solid-js'
import { useParams } from '@solidjs/router'

import type { SingleQuestion, SingleQuiz } from 'model/quiz-question.ts'
import { getQuizMaster } from './services/QuizService.ts'

const Quiz = ({ name, questions }: SingleQuiz) => {
    const Single = ({ id, question }: SingleQuestion) => {
        const quizId: string = `quiz-${id}`

        return <li id={quizId}>{question}</li>
    }

    return (
        <div>
            <h2>Quiz name: {name}</h2>
            <ul>
                <For each={questions} children={Single} />
            </ul>
        </div>
    )
}

export const QuizMaster = () => {
    const params = useParams()
    const quizId = Number.parseInt(params.id)

    const [quizQuestions, setQuizQuestions] = createSignal<SingleQuiz | null>(null)

    onMount(async () => setQuizQuestions(await getQuizMaster(quizId)))

    return <Show when={quizQuestions()} children={Quiz} keyed />
}
