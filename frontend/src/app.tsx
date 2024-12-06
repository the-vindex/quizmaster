import { Route, Router, type RouteSectionProps } from '@solidjs/router'
import { Quiz } from 'quiz.tsx'
import { CreateQuestionForm } from './pages/CreateQuestion.tsx'
import { QuestionList } from 'questions.tsx'
import { QuizMaster } from 'quizmaster.tsx'
import { QuizResult } from './pages/QuizResult.tsx'
import type { Component } from 'solid-js'
import { QuizIntro } from './pages/QuizIntro.tsx'
import { QuizQuestionDetail } from './pages/QuizQuestion.tsx'

// TODO placeholders for new pages
const QuizEdit: Component<RouteSectionProps<unknown>> | undefined = undefined
const QuestionEdit: Component<RouteSectionProps<unknown>> | undefined = undefined

export const App = () => (
    <Router>
        {/* New refactored routes */}
        {/* Quiz run */}
        <Route path="/quiz/:id/intro" component={QuizIntro} />
        <Route path="/quiz/:id/run/:runId/question/:questionId" component={QuizQuestionDetail} />
        <Route path="/quiz/:id/run/:runId/result" component={QuizResult} />

        {/* Quiz New/Edit */}
        <Route path="/quiz/new" component={QuestionList} />
        <Route path="/quiz/:id/edit" component={QuizEdit} />

        {/* Question New/Edit/Detail */}
        <Route path="/question/new" component={CreateQuestionForm} />
        <Route path="/question/:id" component={Quiz} />
        <Route path="/question/:id/edit" component={QuestionEdit} />

        {/* TODO deprecated routes below */}
        <Route path="/create-question" component={CreateQuestionForm} />
        <Route path="/quiz-question/all" component={QuestionList} />
        <Route path="/quizmaster/:id" component={QuizMaster} />
        <Route path="/quizmaster/:id/result" component={QuizResult} />
    </Router>
)
