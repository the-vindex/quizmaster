import './questions.scss'

import { createSignal, For, onMount, Show } from 'solid-js'
import type { QuizQuestion } from 'model/quiz-question.ts'
import { preventDefault } from 'helpers.ts'
import { createQuiz } from './services/QuizService.ts'
import { getQuestions } from './services/QuizQuestionService.ts'

const Feedback = (id: number) => {
    if (id) {
        window.scroll(0, 0)
        return (
            <>
                <p class="feedback">
                    Congratulation, <a href={`/quizmaster/${id}`}>Quiz ID is {id}</a>
                </p>
                <p class="feedback">
                    <a href={`/quiz/${id}/intro`}>Link to the Quiz Run {id}</a>
                </p>
            </>
        )
    }
    return <p class="feedback">{'Oops..something went wrong :('}</p>
}

const Questions = (list: QuizQuestion[]) => {
    const [selectedQuestions, setSelectedQuestions] = createSignal<number[]>([])
    const [quizName, setQuizName] = createSignal<string>('')
    const [quizId, setQuizId] = createSignal<number>(0)
    const [submitted, setSubmitted] = createSignal(false)

    const submit = preventDefault(async () => {
        const quizObj = {
            name: quizName(),
            questionIds: selectedQuestions(),
        }

        createQuiz(quizObj).then(id => {
            setSubmitted(true)
            setQuizId(id)
        })
    })

    const selectQuestion = (questionIdx: number) => () => {
        const isQuestion = selectedQuestions().find(id => id === questionIdx)

        if (isQuestion) {
            // remove question
            const filteredQuestions = selectedQuestions().filter(id => id !== questionIdx)
            setSelectedQuestions(filteredQuestions)
        } else {
            //add question
            setSelectedQuestions([...selectedQuestions(), questionIdx])
        }
    }

    const Question = ({ question, id }: QuizQuestion) => {
        const questionId = `answer-${id}`
        return (
            <li>
                <input type={'checkbox'} name={'question'} id={questionId} value={id} onClick={selectQuestion(id)} />
                <label for={questionId}>{question}</label>
            </li>
        )
    }

    const QuizName = () => {
        return (
            <div>
                <div>
                    <label for={'quizName'}>Quiz name:</label>
                </div>
                <input
                    type={'text'}
                    name={'question'}
                    id={'quizName'}
                    value={quizName()}
                    onInput={e => setQuizName(e.currentTarget.value)}
                    required
                />
            </div>
        )
    }

    return (
        <form onSubmit={submit}>
            <Show when={submitted()} children={Feedback(quizId())} />
            <h1>Quiz: {quizName()}</h1>
            {QuizName()}
            <ul>
                <For each={list} children={Question} fallback={<div>Loading...</div>} />
            </ul>
            <input type="submit" value={'Submit'} disabled={selectedQuestions().length < 1} />
        </form>
    )
}

export const QuestionList = () => {
    const [quizQuestions, setQuizQuestions] = createSignal<QuizQuestion[]>([])

    onMount(async () => setQuizQuestions(await getQuestions()))

    return <Show when={quizQuestions()} children={Questions} keyed />
}
