package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.model.QuizData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class QuizControllerTest {

    @Autowired
    private QuizQuestionRepository quizQuestionRepository;

    @Autowired
    private QuizController quizController;


    @Test
    public void shouldThrowErrorWhenNoQuestions() {
        QuizData quizData = new QuizData("testQuiz");

        ResponseEntity<String> response = quizController.createQuiz(quizData);

        assertNotNull(response);
        assertTrue(response.getStatusCode().is4xxClientError());
    }

}
