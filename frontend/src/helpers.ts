type Handler<E extends Event> = (e: E) => void

export const preventDefault =
    <E extends Event>(handle: Handler<E>): Handler<E> =>
    (e: E): void => {
        e.preventDefault()
        handle(e)
    }
