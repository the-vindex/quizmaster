package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.model.QuizCreateData;
import cz.scrumdojo.quizmaster.model.QuizData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

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
    public void returnAllQuizes() {
        int questionId[] = {0, 1, 2, 3};

        QuizCreateData data = new QuizCreateData("TestName", questionId);

        quizController.createQuiz(data);

        ResponseEntity<List<QuizData>> response = quizController.getAllQuizes();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

    }

    @Test
    public void shouldThrowExceptionWhenNoQuizForRunFound() {
        ResponseEntity<Integer> response = quizController.runQuiz(0);

        assertNotNull(response);
        assertTrue(response.getStatusCode().is4xxClientError());

    }

}
