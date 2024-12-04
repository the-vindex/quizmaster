import { createSignal, Show } from 'solid-js'
import './createQuestion.css'

type Question = {
    question: string
    answers: string[]
    correctAnswers: number[] | null
    explanations: string[]
    questionExplanation: string
    quizType: string
}

export function CreateQuestionForm() {
    const [question, setQuestion] = createSignal<string>('')
    const [answers, setAnswers] = createSignal<string[]>(['', '', '', ''])
    const [correctAnswers, setCorrectAnswers] = createSignal<number[]>([])
    const [questionExplanations, setQuestionExplanations] = createSignal<string[]>(['', '', '', ''])
    const [answerExplanation, setAnswerExplanation] = createSignal<string>('')
    const [linkToQuestion, setLinkToQuestion] = createSignal<string>('')
    const [isMultipleAnswer, setIsMultipleAnswer] = createSignal<boolean>(false)

    const postData = (formData: Question) => {
        const data = {
            question: formData.question,
            answers: formData.answers,
            correctAnswers: formData.correctAnswers,
            explanations: formData.explanations,
            questionExplanation: formData.questionExplanation,
            quizType: formData.quizType,
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
                    setLinkToQuestion('Invalid question')
                    throw new Error()
                }
                return response.json() // Parse JSON response
            })
            .then(data => {
                setLinkToQuestion(`${location.origin}/quiz/${data}`)
            })
            .catch(error => {
                console.error('Error:', error) // Handle errors
                if (error.message) {
                    setLinkToQuestion(error.message)
                }
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

    const toggleMultipleAnswers = () => {
        setIsMultipleAnswer(prev => !prev)
    }

    const handleCorrectAnswerClick = (index: number) => {
        if (isMultipleAnswer()) {
            if (correctAnswers().includes(index)) {
                setCorrectAnswers(correctAnswers().filter(item => item !== index))
            } else {
                setCorrectAnswers([...correctAnswers(), index])
            }
        } else {
            setCorrectAnswers([index])
        }
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault()
        const formData = {
            question: question(),
            answers: answers(),
            correctAnswers: correctAnswers(),
            quizType: isMultipleAnswer() ? 'MULTIPLE' : 'SINGLE',
            explanations: questionExplanations(),
            questionExplanation: answerExplanation(),
        }
        postData(formData)
    }

    {
        const answersArray = answers()
        return (
            <div class="wrapper">
                <h1>Quiz Question Creation Page</h1>
                <h2>If you're happy and you know it create the question</h2>
                <form class="question-create-form" onSubmit={handleSubmit}>
                    {/* Question input */}
                    <div>
                        <label for="question-text-area">Enter your question:</label>
                        <textarea
                            id="question-text-area"
                            class="textarea"
                            value={question()}
                            onInput={e => setQuestion((e.target as HTMLTextAreaElement).value)}
                            rows="3"
                        />
                    </div>
                    <div class="multipleQuestionsRow">
                        <input type="checkbox" checked={isMultipleAnswer()} onChange={toggleMultipleAnswers} />
                        Is this question with multiple possible answers?
                        <br />
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
                                checked={correctAnswers().includes(index)}
                                onChange={() => handleCorrectAnswerClick(index)}
                                class="checkbox"
                            />
                            {
                                <input
                                    id={`answer-explanation-${index + 1}`}
                                    type="text"
                                    placeholder="Explanation for wrong answer"
                                    value={questionExplanations()[index]}
                                    onInput={e => updateExplanation(index, (e.target as HTMLInputElement).value)}
                                    class="explanationInput"
                                />
                            }
                        </div>
                    ))}
                    {
                        <div class="generalExplanationWrapper">
                            <label for="general-explanation">General explanation for the entire question:</label>
                            <textarea
                                id="general-explanation"
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
                    <Show when={linkToQuestion()}>
                        <span id="question-link">{linkToQuestion()}</span>
                    </Show>
                </form>
            </div>
        )
    }
}
