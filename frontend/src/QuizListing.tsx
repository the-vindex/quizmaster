// quiz-listing-page.ts
import { type Accessor, createSignal, For, onMount, Show } from 'solid-js'
import { useParams } from '@solidjs/router'

import type { Quiz } from 'model/quiz-question.ts'
import * as api from 'api.ts'
import { preventDefault } from 'helpers.ts'
import { transformObjectToArray } from './utils/transformObjectToArray.ts'

const QuizList = () => {

    return (
        <div>
            <h1>Quiz Listing</h1>
        </div>
    )
}

export const QuizListing = ()=> {

 //   const [quizes, setQuizes] = createSignal<Quiz[]>([])

 //   onMount(async () => setQuizes(await api.getQuizes()))

    //when={quizQuestions()}
    return <Show children={QuizList} keyed />
}
