import './QuizFeedbackSummary.css'
import { createSignal, onMount } from 'solid-js'
import type { QuizRunResult } from '../../model/quiz-result.ts'
import { getResults } from '../../services/QuizResultService.ts'

const getAnswers = (ids: number[], list: string[]) => {
    return (
        <>
            {ids.map((id, index) => {
                return (
                    <div>
                        <span>{list[id]}</span>
                        <br />
                    </div>
                )
            })}
        </>
    )
}

export const QuizFeedbackSummary = () => {
    const [result, setResult] = createSignal<QuizRunResult | null>(null)

    onMount(() => {
        setResult(getResults())
    })

    return (
        <div id="feedback-summary">
            <table id="results-table" class="feedback-summary-table">
                <tbody>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Correct Answer</th>
                        <th>Explanation</th>
                    </tr>

                    {result()?.questionResults.map(q => (
                        <tr>
                            <td>{q.question.question}</td>
                            <td>{getAnswers(q.selectedAnswers, q.question.answers)}</td>
                            <td>{getAnswers(q.question.correctAnswers, q.question.answers)}</td>
                            <td>{getAnswers(q.explanationToShowIds, q.question.explanations)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
