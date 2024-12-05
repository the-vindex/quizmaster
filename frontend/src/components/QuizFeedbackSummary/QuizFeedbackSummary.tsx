import './QuizFeedbackSummary.css'
import { createSignal, onMount } from 'solid-js'
import type { QuizRunResult } from '../../model/quiz-result.ts'
import { getResults } from '../../services/QuizResultService.ts'

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
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
