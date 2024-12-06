import './quiz.scss'

import { createSignal, onMount, Show } from 'solid-js'
import { useParams } from '@solidjs/router'

import type { QuizQuestion } from 'model/quiz-question.ts'
import { getQuestion } from './services/QuizQuestionService.ts'
import { QuestionForm } from './components/question/QuestionForm.tsx'

export const Quiz = () => {
    const params = useParams()
    const questionId = Number.parseInt(params.id)

    const [quizQuestion, setQuizQuestion] = createSignal<QuizQuestion | null>(null)

    onMount(async () => setQuizQuestion(await getQuestion(questionId)))

    return <Show when={quizQuestion()} children={QuestionForm} keyed />
}
