import { Route, Router } from '@solidjs/router'
import { Quiz } from './quiz.tsx'

export const App = ()=>
    <Router>
        <Route path="/quiz/:id" component={ Quiz }/>
    </Router>
