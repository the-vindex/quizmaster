import { createSignal } from 'solid-js'
import './createQuestion.css'

type Question = {
    question: string
    answers: string[]
    correctAnswer: number | null
    explanations: string[]
    questionExplanation: string
    quizType: string
}

export function CreateQuestionForm() {
    const [question, setQuestion] = createSignal<string>('')
    const [answers, setAnswers] = createSignal<string[]>(['', '', '', ''])
    const [correctAnswer, setCorrectAnswer] = createSignal<number | null>(null)
    const [questionExplanations, setQuestionExplanations] = createSignal<string[]>(['', '', '', ''])
    const [answerExplanation, setAnswerExplanation] = createSignal<string>('')
    const [linkToQuestion, setLinkToQuestion] = createSignal<string>('')

    const postData = (formData: Question) => {
        const data = {
            question: formData.question,
            answers: formData.answers,
            correctAnswer: formData.correctAnswer,
            explanations: formData.explanations,
            questionExplanation: formData.questionExplanation,
            quizType: 'SINGLE',
        }
        fetch('/api/quiz-question', {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(data), // Convert the object to a JSON string
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json() // Parse JSON response
            })
            .then(data => {
                console.log('Success:', data) // Handle the response data
                setLinkToQuestion(`${location.origin}/quiz/${data}`)
            })
            .catch(error => {
                console.error('Error:', error) // Handle errors
            })
    }

    const updateAnswer = (index: number, value: string) => {
        setAnswers(prev => {
            const newAnswers = [...prev]
            newAnswers[index] = value
            return newAnswers
        })
    }
    const updateExplanation = (index: number, value: string) => {
        setQuestionExplanations(prev => {
            const newExplanations = [...prev]
            newExplanations[index] = value
            return newExplanations
        })
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault()
        const formData = {
            question: question(),
            answers: answers(),
            correctAnswer: correctAnswer(),
            quizType: 'SINGLE',
            explanations: questionExplanations(),
            questionExplanation: answerExplanation(),
        }
        console.log(formData) // Handle form data submission
        postData(formData)
    }

    {
        const answersArray = answers()
        return (
            <form class="question-create-form" onSubmit={handleSubmit}>
                {/* Question input */}
                <div>
                    <label>Enter your question:</label>
                    <textarea
                        id="question-text-area"
                        class="textarea"
                        value={question()}
                        onInput={e => setQuestion((e.target as HTMLTextAreaElement).value)}
                        rows="3"
                    />
                </div>
                {/* Answer rows */}
                {answersArray.map((_answer, index) => (
                    <div class="answerRow">
                        <input
                            id={`answer-text-${index + 1}`}
                            type="text"
                            placeholder={`Answer ${index + 1}`}
                            value={answers()[index]}
                            onInput={e => updateAnswer(index, (e.target as HTMLInputElement).value)}
                            class="answerInput"
                        />
                        <input
                            id={`answer-checkbox-${index + 1}`}
                            type="checkbox"
                            checked={correctAnswer() === index}
                            onChange={() => setCorrectAnswer(index)}
                            class="checkbox"
                        />
                        {
                            <input
                                type="text"
                                placeholder="Explanations for wrong answer"
                                value={questionExplanations()[index]}
                                onInput={e => updateExplanation(index, (e.target as HTMLInputElement).value)}
                                class="explanationInput"
                            />
                        }
                    </div>
                ))}
                {
                    <div>
                        <label>General explanation for the entire question:</label>
                        <textarea
                            class="generalExplanation"
                            value={answerExplanation()}
                            onInput={e => setAnswerExplanation((e.target as HTMLTextAreaElement).value)}
                            rows="2"
                        />
                    </div>
                }
                {/* Submit button */}
                <button type="submit" class="submitButton">
                    Submit
                </button>{' '}
                <br />
                <span id="question-link">{linkToQuestion()}</span>
            </form>
        )
    }
}
