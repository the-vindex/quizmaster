import { QuizFeedbackSummary } from '../components/QuizFeedbackSummary/QuizFeedbackSummary.tsx'
import { QuizScore } from 'components/QuizScore/QuizScore.tsx'

export function QuizResult() {
    const QuizName = 'dummy quiz name'

    return (
        <>
            <h1 id="quiz-result-page">Quiz Result Page</h1>
            <h2 id="quiz-title">{QuizName}</h2>

            <QuizScore />
            <QuizFeedbackSummary />
        </>
    )
}
