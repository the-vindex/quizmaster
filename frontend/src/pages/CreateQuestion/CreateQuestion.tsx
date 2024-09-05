import { createSignal } from 'solid-js';
import './createQuestion.css'; // Import the CSS module

function QuizForm() {
    const [question, setQuestion] = createSignal<string>('');
    // uncomment to include answers
    // const [answers, setAnswers] = createSignal<string[]>(['', '', '', '']);
    // const [correctAnswer, setCorrectAnswer] = createSignal<number | null>(null);
    // uncomment to include explanations
    // const [questionExplanations, setQuestionExplanations] = createSignal<string[]>(['', '', '', '']);
    // const [answerExplanation, setAnswerExplanations] = createSignal<string>('');
    {/*
  const updateAnswer = (index: number, value: string) => {

    //setTimeout(() => console.log("debouncing 500 ms"), 500)
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = value;
      return newAnswers;
    });
  };*/}
    // uncomment to include explanation
    /*
      const updateExplanation = (index: number, value: string) => {
        setQuestionExplanations(prev => {
          const newExplanations = [...prev];
          newExplanations[index] = value;
          return newExplanations;
        });
      }; */

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const formData = {
            question: question(),
            // answers: answers(),
            // correctAnswer: correctAnswer(),
            // uncomment to include Explanations
            // questionExplanations: questionExplanations(),
            // generalExplanations: generalExplanations(),
        };
        console.log(formData); // Handle form data submission
    };


    {// const answersArray = answers()
        return (
            <form class="question-create-form" onSubmit={handleSubmit}>
                {/* Question input */}
                <div>
                    <label>Enter your question:</label>
                    <textarea
                        id="question-text-area"
                        class="textarea"
                        value={question()}
                        onInput={(e) => setQuestion((e.target as HTMLTextAreaElement).value)}
                        rows="3"
                    />
                </div>

                {/* Answer rows */}
                {/*answersArray.map((_answer, index) => (
        <div class="answerRow">
          <input
            type="text"
            placeholder={`Answer ${index +1}`}
            value={answers()[index]}
            onInput={(e) => updateAnswer(index, (e.target as HTMLInputElement).value)}
            class="answerInput"
          />
          <input
            type="checkbox"
            checked={correctAnswer() === index}
            onChange={() => setCorrectAnswer(index)}
            class="checkbox"
          />{// uncomment to include Explanations
            /*
          <input
            type="text"
            placeholder="Explanations for wrong answer"
            value={questionExplanations()[index]}
            onInput={(e) => updateExplanation(index, (e.target as HTMLInputElement).value)}
            class="explanationInput"
          />}
        </div>
      ))}

      {// uncomment to include explanation
      /*
      <div>
        <label>General explanation for the entire question:</label>
        <textarea
          class="generalExplanation"
          value={generalExplanation()}
          onInput={(e) => setGeneralExplanation((e.target as HTMLTextAreaElement).value)}
          rows="2"
        />
      </div>*/}

                {/* Submit button */}
                <button type="submit" class="submitButton">Submit</button>
            </form>
        );
    }
}

export default QuizForm;
