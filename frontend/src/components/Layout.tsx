import type { JSX } from 'solid-js'
import './layout.css'

export const Layout = (props: { children: JSX.Element }) => {
    return <div class="centered-layout">{props.children}</div>
}
