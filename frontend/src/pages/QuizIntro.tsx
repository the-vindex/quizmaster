import './quizIntro.css'

import { createSignal, onMount, Show } from 'solid-js'
import { useNavigate, useParams } from '@solidjs/router'

import type { SingleQuiz } from 'model/quiz-question.ts'
import { Spinner } from '../components/Spinner.tsx'
import { Layout } from '../components/Layout.tsx'
import { createQuizRun, getQuizMaster } from '../services/QuizService.ts'

export const IntroPageContent = (props: {
    quiz: SingleQuiz | null
    quizId?: string
}) => {
    const navigate = useNavigate()

    if (!props.quiz) {
        return <div>Quiz not loaded correctly</div>
    }

    const startQuiz = async () => {
        if (props.quiz && props.quizId) {
            const quizRunId = await createQuizRun(props.quizId)
            navigate(`/quiz/${props.quizId}/run/${quizRunId}/question/${props.quiz.questions[0].id}`)
        }
    }

    return (
        <div>
            <h1>Welcome to quiz "{props.quiz.name}"</h1>
            <p>
                Už jste někdy slyšeli o Test Driven Developmentu nebo Trunk-Based Developmentu? Používáte techniky jako
                Specification by Example či Pair Programming?
            </p>
            <div class="btn-row">
                <button type="button" class="start-btn" onClick={startQuiz}>
                    Start the quiz
                </button>
            </div>
        </div>
    )
}

export const QuizIntro = () => {
    const params = useParams()
    const quizId = params.id

    const [quiz, setQuiz] = createSignal<SingleQuiz | null>(null)

    onMount(async () => setQuiz(await getQuizMaster(quizId)))

    return (
        <Layout>
            <Show when={quiz()} fallback={<Spinner />}>
                <IntroPageContent quiz={quiz()} quizId={quizId} />
            </Show>
        </Layout>
    )
}
