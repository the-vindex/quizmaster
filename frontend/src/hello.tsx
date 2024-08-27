import {createSignal, onMount} from 'solid-js'

export const Hello = () => {
    const [message, setMessage] = createSignal('Loading...')

    onMount(async () => {
        const response = await fetch('/api/hello')
        const data = await response.text()
        setMessage(data)
    });

    return <p>{ message() }</p>;
}
