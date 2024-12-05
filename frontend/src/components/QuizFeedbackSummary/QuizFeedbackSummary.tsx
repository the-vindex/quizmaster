import './QuizFeedbackSummary.css'

export const QuizFeedbackSummary = () => {
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
                    <tr>
                        <td>A</td>
                        <td>B</td>
                        <td>C</td>
                        <td>D</td>
                    </tr>
                    <tr>
                        <td>D</td>
                        <td>D</td>
                        <td>D</td>
                        <td>D</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
