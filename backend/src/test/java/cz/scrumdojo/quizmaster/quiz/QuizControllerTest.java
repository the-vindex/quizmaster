package cz.scrumdojo.quizmaster.quiz;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class QuizControllerTest {

    @Autowired
    private QuizController quizController;

    @Test
    public void createQuiz() {
        ResponseEntity<String> response = quizController.createQuiz();

        assertNotNull(response);
        assertTrue(response.getStatusCode().is2xxSuccessful());
    }
}