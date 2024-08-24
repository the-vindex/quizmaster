import { createSignal, onMount } from 'solid-js'

export const App = ()=> {
    const [message, setMessage] = createSignal('Loading...')

    onMount(async () => {
        const response = await fetch('/api/hello')
        const data = await response.text()
        setMessage(data)
    });

    return <>
        <h1>Quizmaster</h1>
        <p>{ message() }</p>
    </>
}
