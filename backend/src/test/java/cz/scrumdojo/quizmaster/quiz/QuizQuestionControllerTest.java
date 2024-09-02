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

    @Test
    public void getQuestion() {
        var question = QuizQuestion.builder()
            .question("What is the capital of Italy?")
            .answers(new String[]{"Rome", "Naples", "Florence", "Palermo"})
            .correctAnswer(0)
            .build();

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
        var question = QuizQuestion.builder()
            .question("What is the capital of Italy?")
            .answers(new String[]{"Naples", "Rome", "Florence", "Palermo"})
            .correctAnswer(1)
            .build();

        var questionId = quizQuestionController.saveQuestion(question);

        var result = quizQuestionController.answerQuestion(questionId, 1);

        assertTrue(result);
    }

    @Test
    public void answerQuestionIncorrectly() {
        var question = QuizQuestion.builder()
            .question("What is the capital of Italy?")
            .answers(new String[]{"Naples", "Rome", "Florence", "Palermo"})
            .correctAnswer(1)
            .build();

        var questionId = quizQuestionController.saveQuestion(question);

        var result = quizQuestionController.answerQuestion(questionId, 0);

        assertFalse(result);
    }
}
