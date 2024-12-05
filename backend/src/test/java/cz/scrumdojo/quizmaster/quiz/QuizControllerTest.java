package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.model.QuizCreateData;
import cz.scrumdojo.quizmaster.model.QuizData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class QuizControllerTest {
    // test
    @Autowired
    private QuizQuestionRepository quizQuestionRepository;

    @Autowired
    private QuizController quizController;


    @Test
    public void shouldThrowErrorWhenNoQuestions() {
        QuizCreateData quizData = new QuizCreateData("testQuiz", null);

        ResponseEntity<String> response = quizController.createQuiz(quizData);

        assertNotNull(response);
        assertTrue(response.getStatusCode().is4xxClientError());
    }

    @Test
    public void shouldThrowExceptionWhenNoQuizFound() {
        ResponseEntity<QuizData> response = quizController.getQuiz(Integer.MAX_VALUE);

        assertNotNull(response);
        assertTrue(response.getStatusCode().is4xxClientError());

    }

    @Test
    public void shouldThrowExceptionWhenNoQuizForRunFound() {
        ResponseEntity<Integer> response = quizController.runQuiz(0);

        assertNotNull(response);
        assertTrue(response.getStatusCode().is4xxClientError());

    }

}
