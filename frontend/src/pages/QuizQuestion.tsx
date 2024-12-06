import { useParams } from '@solidjs/router'
import { createSignal, onMount, Show } from 'solid-js'
import type { QuizQuestion } from '../model/quiz-question.ts'
import { Layout } from '../components/Layout.tsx'
import { Spinner } from '../components/Spinner.tsx'
import { getQuestion } from '../services/QuizQuestionService.ts'
import { QuestionForm } from '../components/question/QuestionForm.tsx'
import './quizQuestion.css'

export const QuizQuestionDetail = () => {
    const params = useParams()
    const questionId = params.questionId
    // const quizId = params.id
    // const quizRunId = params.runId

    const [question, setQuestion] = createSignal<QuizQuestion | null>(null)

    onMount(async () => setQuestion(await getQuestion(questionId)))

    return (
        <Layout>
            <div class="container">
                <Show when={question()} fallback={<Spinner />} children={QuestionForm} keyed />
            </div>
        </Layout>
    )
}
