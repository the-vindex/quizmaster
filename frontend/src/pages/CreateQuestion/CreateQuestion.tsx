import { createSignal } from 'solid-js'
import './createQuestion.css'

function QuizForm() {
    const [question, setQuestion] = createSignal<string>('')
    const [answers, setAnswers] = createSignal<string[]>(['', '', '', ''])
    const [correctAnswer, setCorrectAnswer] = createSignal<number | null>(null)
    const [questionExplanations, setQuestionExplanations] = createSignal<string[]>(['', '', '', ''])
    const [answerExplanation, setAnswerExplanation] = createSignal<string>('')

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
            questionExplanations: questionExplanations(),
            generalExplanations: answerExplanation(),
        }
        console.log(formData) // Handle form data submission
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
                            type="text"
                            placeholder={`Answer ${index + 1}`}
                            value={answers()[index]}
                            onInput={e => updateAnswer(index, (e.target as HTMLInputElement).value)}
                            class="answerInput"
                        />
                        <input
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
                </button>
            </form>
        )
    }
}

export default QuizForm
