package cz.scrumdojo.quizmaster.quiz;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class QuizQuestionControllerTest {

    @Autowired
    private QuizQuestionController quizQuestionController;

    @Test
    public void getQuestion() {
        var result = quizQuestionController.getQuestion(1).getBody();

        assertNotNull(result);
        assertEquals("What is the capital of Italy?", result.getQuestion());

        assertEquals(4, result.getAnswers().length);
        assertEquals("Rome", result.getAnswers()[0]);
        assertEquals("Naples", result.getAnswers()[1]);
        assertEquals("Florence", result.getAnswers()[2]);
        assertEquals("Palermo", result.getAnswers()[3]);
    }

    @Test
    public void nonExistingQuestion() {
        ResponseEntity<?> response = quizQuestionController.getQuestion(-1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
