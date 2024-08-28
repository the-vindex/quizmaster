import { createSignal, For, onMount, Show } from 'solid-js'

interface QuizQuestion {
    readonly question: string
    readonly answers: readonly string[]
}

export const Quiz = () => {
    const [quizQuestion, setQuizQuestion] = createSignal<QuizQuestion | null>(null)

    onMount(async () => {
        const response = await fetch('/api/quiz-question')
        const data = await response.json()
        setQuizQuestion(data)
    });

    return <Show when={ quizQuestion() }>
        <h1>{ quizQuestion()!.question }</h1>
        <ul>
            <For each={ quizQuestion()!.answers }>
                { answer => <li>{ answer }</li> }
            </For>
        </ul>
    </Show>
}
