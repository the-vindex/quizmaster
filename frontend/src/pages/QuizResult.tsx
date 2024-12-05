import { QuizFeedbackSummary } from '../components/QuizFeedbackSummary/QuizFeedbackSummary.tsx'
import { QuizScore } from 'components/QuizScore/QuizScore.tsx'
import { createSignal, onMount } from 'solid-js'
import type { QuizRunResult } from '../model/quiz-result.ts'
import { getResults } from '../services/QuizResultService.ts'

export function QuizResult() {
    const [result, setResult] = createSignal<QuizRunResult | null>(null)

    onMount(() => {
        setResult(getResults())
    })

    return (
        <>
            <h1 id="quiz-result-page">Quiz Result Page</h1>
            <h2 id="quiz-title">{result()?.quiz.name}</h2>
            <p id="quiz-id">{result()?.quizId}</p>

            <QuizScore />
            <QuizFeedbackSummary />
        </>
    )
}
