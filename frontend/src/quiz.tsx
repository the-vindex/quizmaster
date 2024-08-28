import { For } from 'solid-js'

interface QuizQuestion {
    readonly question: string
    readonly answers: readonly string[]
}

export const Quiz = () => {
    const quizQuestion: QuizQuestion = {
        question: 'What is the capital of Italy?',
        answers: ['Rome', 'Naples', 'Florence', 'Palermo']
    }

    return <>
        <h1>{ quizQuestion.question }</h1>
        <ul>
            <For each={ quizQuestion.answers }>
                { answer => <li>{ answer }</li> }
            </For>
        </ul>
    </>
}
