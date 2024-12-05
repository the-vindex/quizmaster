import './quizIntro.css'

import { createSignal, onMount, Show } from 'solid-js'
import { useParams } from '@solidjs/router'

import type { SingleQuiz } from 'model/quiz-question.ts'
import { Spinner } from '../components/Spinner.tsx'
import { Layout } from '../components/Layout.tsx'
import { createQuizRun, getQuizMaster } from '../services/QuizService.ts'
import { useNavigate } from '@solidjs/router'

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
            <p>The Goal is to achieve the highest amount of correct answers. Good luck, have fun!</p>
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
            <Show when={!quiz()} fallback={<IntroPageContent quiz={quiz()} quizId={quizId} />}>
                <Spinner />
            </Show>
        </Layout>
    )
}
