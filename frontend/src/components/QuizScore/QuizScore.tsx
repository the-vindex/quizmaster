import './QuizScore.css'

import { fetchJson } from 'utils/apiUtils'
import { createSignal, onMount } from 'solid-js'

type Score = {
    question_count: number
    success_count: number
    score: number
}

export function QuizScore() {
    const [score, setScore] = createSignal({
        question_count: 0,
        success_count: 0,
        score: 0,
    })

    onMount(async () => {
        const data = await fetchJson<Score>('/api/quiz/score/1')
        setScore(data)
    })

    return (
        <div id="quiz-score" class="quiz-score">
            <h3>Score</h3>
            <p data-test="success_count">
                {score().success_count} z {score().question_count}
            </p>
            <p data-test="success_score">{score().score}%</p>
        </div>
    )
}
