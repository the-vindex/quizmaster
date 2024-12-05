import { QuizFeedbackSummary } from '../components/QuizFeedbackSummary.tsx'
import { Score } from 'components/score'

export function QuizResult() {
    return (
        <>
            <h1 id="quiz-result-page">Quiz Result Page</h1>
            <Score />
            <QuizFeedbackSummary />
        </>
    )
}
