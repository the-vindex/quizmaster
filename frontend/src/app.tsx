import { Route, Router } from '@solidjs/router'
import { Hello } from './hello.tsx'
import { Quiz } from './quiz.tsx'

export const App = ()=>
    <Router>
        <Route path="/hello" component={ Hello }/>
        <Route path="/quiz/:id" component={ Quiz }/>
    </Router>
