import { useNavigate, useParams } from '@solidjs/router'
import { createEffect, createSignal, onMount, Show } from 'solid-js'
import type { QuizQuestion, QuizQuestionProps, SingleQuiz } from '../model/quiz-question.ts'
import { Layout } from '../components/Layout.tsx'
import { Spinner } from '../components/Spinner.tsx'
import { getQuestion } from '../services/QuizQuestionService.ts'
import './quizQuestion.css'
import { getQuizMaster } from '../services/QuizService.ts'
import { QuestionFormV2 } from '../components/question/QuestionFormV2.tsx'

export const QuizQuestionDetail = () => {
    const navigate = useNavigate()
    const params = useParams()
    const questionId = params.questionId
    const quizId = params.id
    const quizRunId = params.runId

    const [quiz, setQuiz] = createSignal<SingleQuiz | null>(null)
    const [question, setQuestion] = createSignal<QuizQuestion | null>(null)
    const [formProps, setFormProps] = createSignal<QuizQuestionProps | null>(null)

    // TODO resolve page rerender
    // const location = useLocation()
    // const [urlQuestionId, setUrlQuestionId] = createSignal<string | null>(null)
    // setUrlQuestionId(questionId)
    /*createEffect(async () => {
        if (location.pathname) console.log('current URL', location.pathname)

        const currQuestionId = urlQuestionId()
        if (currQuestionId) {
            setQuestion(await getQuestion(currQuestionId))
        }
    })*/

    onMount(async () => setQuiz(await getQuizMaster(quizId)))
    onMount(async () => setQuestion(await getQuestion(questionId)))

    const onSuccessfulSubmit = () => {
        const currentQuestionIdx = quiz()?.questions?.findIndex(q => q.id.toString() === questionId)

        if (currentQuestionIdx !== undefined && quiz()) {
            const isFinalQuestion = currentQuestionIdx + 1 === quiz()?.questions?.length

            if (isFinalQuestion) {
                navigate(`/quiz/${quizId}/run/${quizRunId}/result`)
            } else {
                const nextQuestionIdx = currentQuestionIdx > -1 ? currentQuestionIdx + 1 : -1
                nextQuestionIdx > -1 &&
                    navigate(`/quiz/${quizId}/run/${quizRunId}/question/${quiz()?.questions[nextQuestionIdx].id}`)
                setTimeout(() => window.location.reload())
            }
        }
    }

    createEffect(() => {
        if (question()) {
            // @ts-ignore
            setFormProps({
                ...question(),
                quizId,
                quizRunId,
                onSuccessfulSubmit,
            })
        }
    })

    console.log(question())
    console.log(formProps())

    return (
        <Layout>
            <div class="container">
                <Show when={formProps()} fallback={<Spinner />} children={QuestionFormV2} keyed />
            </div>
        </Layout>
    )
}
