import { Route, Router } from '@solidjs/router'
import { Quiz } from 'quiz.tsx'
import { CreateQuestionForm } from './pages/CreateQuestion.tsx'
import { QuestionList } from 'questions.tsx'
import { QuizMaster } from 'quizmaster.tsx'
import { QuizResult } from "./pages/QuizResult.tsx";

export const App = () => (
    <Router>
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/create-question" component={CreateQuestionForm} />
        <Route path="/quiz-question/all" component={QuestionList} />
        <Route path="/quizmaster/:id" component={QuizMaster} />
        <Route path="/quizmaster/:id/result" component={QuizResult} />
    </Router>
)
