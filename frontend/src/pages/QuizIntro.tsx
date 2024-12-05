import './quizIntro.css'

import { createSignal, onMount, Show } from 'solid-js'
import { useParams } from '@solidjs/router'

import type { SingleQuiz } from 'model/quiz-question.ts'
import * as api from 'api.ts'
import { Spinner } from '../components/Spinner.tsx'
import { Layout } from '../components/Layout.tsx'

export const IntroPageContent = (props: { quiz: SingleQuiz | null }) => {
    if (!props.quiz) {
        return <div>Quiz not loaded correctly</div>
    }

    return (
        <div>
            <h1>Welcome to quiz "{props.quiz.name}"</h1>
            <p>The Goal is to achieve the highest amount of correct answers. Good luck, have fun!</p>
            <button type="button">Start the quiz</button>
        </div>
    )
}

export const QuizIntro = () => {
    const params = useParams()
    const questionId = Number.parseInt(params.id)

    const [quiz, setQuiz] = createSignal<SingleQuiz | null>(null)

    onMount(async () => setQuiz(await api.getQuizMaster(questionId)))

    return (
        <Layout>
            <Show when={!quiz()} fallback={<IntroPageContent quiz={quiz()} />}>
                <Spinner />
            </Show>
        </Layout>
    )
}
