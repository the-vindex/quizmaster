import { Route, Router } from '@solidjs/router'
import { Quiz } from 'quiz.tsx'
import { CreateQuestion } from './pages/CreateQuestion/CreateQuestion.tsx'
import { QuestionList } from 'questions.tsx'

export const App = () => (
    <Router>
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/create-question" component={CreateQuestion} />
        <Route path="/quiz-question/all" component={QuestionList} />
    </Router>
)
