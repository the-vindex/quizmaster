package cz.scrumdojo.quizmaster.quiz;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class QuizQuestionControllerTest {

    @Autowired
    private QuizQuestionController quizQuestionController;

    private QuizQuestion createQuestion() {
        return QuizQuestion.builder()
            .question("What is the capital of Italy?")
            .answers(new String[]{"Naples", "Rome", "Florence", "Palermo"})
            .correctAnswer(1)
            .build();
    }

    @Test
    public void getQuestion() {
        var question = createQuestion();
        var questionId = quizQuestionController.saveQuestion(question);

        var result = quizQuestionController.getQuestion(questionId).getBody();

        assertNotNull(result);
        assertEquals(question.getQuestion(), result.getQuestion());
        assertArrayEquals(question.getAnswers(), result.getAnswers());
    }

    @Test
    public void nonExistingQuestion() {
        ResponseEntity<?> response = quizQuestionController.getQuestion(-1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void answerQuestionCorrectly() {
        var questionId = quizQuestionController.saveQuestion(createQuestion());

        assertTrue(quizQuestionController.answerQuestion(questionId, 1));
    }

    @Test
    public void answerQuestionIncorrectly() {
        var questionId = quizQuestionController.saveQuestion(createQuestion());

        assertFalse(quizQuestionController.answerQuestion(questionId, 0));
    }
}
