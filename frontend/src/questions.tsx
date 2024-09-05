import './questions.scss'

import { createSignal, For, onMount, Show } from 'solid-js'
import type { QuizQuestion } from 'model/quiz-question.ts'
import * as api from 'api.ts'
import { preventDefault } from 'helpers.ts'

const Feedback = (id: number) => <p class="feedback">{id ? `Congratulation, Quiz ID is ${id}` : 'Oops..something went wrong :('}</p>

const Questions = (list: QuizQuestion[]) => {
    const [selectedQuestions, setSelectedQuestions] = createSignal<number[]>([])
    const [quizName, setQuizName] = createSignal<string>('')
    const [quizId, setQuizId] = createSignal<number>(0)
    const [submitted, setSubmitted] = createSignal(false)

    const submit = preventDefault(async () => {
        api.createQuiz(selectedQuestions()).then(id => {
            setSubmitted(true)
            setQuizId(id)
        })
    })

    const selectQuestion = (questionIdx: number) => () => {
      const isQuestion = selectedQuestions().find(id => id === questionIdx)

      if(isQuestion) { // remove question
        const filteredQuestions = selectedQuestions().filter(id => id !== questionIdx)
        setSelectedQuestions(filteredQuestions)
      } else { //add question
        setSelectedQuestions([...selectedQuestions(), questionIdx])
      }      
    }


    const Question = ({ question, id }: QuizQuestion) => {
        const questionId = `answer-${id}`
        return (
            <li>
                <input
                    type={'checkbox'}
                    name={'question'}
                    id={questionId}
                    value={id}
                    onClick={selectQuestion(id)} 
                />
                <label for={questionId}>{question}</label>
            </li>
        )
    }

    const QuizName = () => {
        return (
            <div>
                <div><label for={`quizName`}>Quiz name:</label></div>
                <input
                    type={'text'}
                    name={'question'}
                    id={`quizName`}
                    value={quizName()}
                    onInput={(e) => setQuizName(e.currentTarget.value)}
                    required
                />
            </div>
        )
    }

    return (
        <form onSubmit={submit}>
            <h1>Quiz: {quizName()}</h1>
            {QuizName()}
            <ul>
                <For each={list} children={Question} fallback={<div>Loading...</div>} />
            </ul>
            <input type="submit" value={'Submit'} disabled={selectedQuestions().length < 1} />
            <Show when={submitted()} children={Feedback(quizId())} />
        </form>
    )
}

export const QuestionList = () => {
    const [quizQuestions, setQuizQuestions] = createSignal<QuizQuestion[]>([])

    onMount(async () => setQuizQuestions(await api.getQuestions()))

    return <Show when={quizQuestions()} children={Questions} keyed />
}
