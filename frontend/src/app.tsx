import { Route, Router } from '@solidjs/router'
import { Hello } from './hello.tsx'

export const App = ()=>
    <Router>
        <Route path="/hello" component={ Hello }/>
    </Router>
