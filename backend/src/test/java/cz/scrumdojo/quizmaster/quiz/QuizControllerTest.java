package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.model.QuizCreateData;
import cz.scrumdojo.quizmaster.model.QuizData;
import cz.scrumdojo.quizmaster.model.QuizRunState;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class QuizControllerTest {
    // test
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private QuizRunRepository quizRunRepository;
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
    public void returnAllCreatedQuizes() {
        var firstQuizId = createQuiz();
        var secondQuizId = createQuiz();
        
        ResponseEntity<List<QuizData>> response = quizController.getAllQuizes();
        var responseBody = response.getBody();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(responseBody);
        assertTrue(responseBody.stream().anyMatch(a -> a.getId() == firstQuizId));
        assertTrue(responseBody.stream().anyMatch(a -> a.getId() == secondQuizId));
    }  

    @Test
    public void shouldThrowExceptionWhenNoQuizForRunFound() {
        ResponseEntity<Integer> response = quizController.runQuiz(0);

        assertNotNull(response);
        assertTrue(response.getStatusCode().is4xxClientError());
    }

    @Test
    public void canRunQuizForQuestion() {
        var quizId = createQuiz();
        
        var response = quizController.runQuiz(quizId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    public void canCompletedRunningQuiz() {
        var quizId = createQuiz();
        var quizRunId = createQuizRun(quizId);
        
        var response = quizController.completeQuiz(quizRunId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }
    
    private int createQuiz() {
        int questionId[] = {0, 1, 2, 3};
        var quizData = new QuizCreateData("TestName", questionId);

        var quiz = Quiz.builder()
        .name(quizData.getName())
        .questions(Arrays.stream( questionId ).boxed().toArray( Integer[]::new ))
        .build();
        
        return quizRepository.save(quiz).getId();
    }  

    private int createQuizRun(Integer quizId) {
        var quizRun = QuizRun.builder()
        .quizId(quizId)
        .runState(QuizRunState.RUNNING.name())
        .creationDate(new Timestamp(System.currentTimeMillis()))
        .build();
        
        return quizRunRepository.save(quizRun).getId();
    }
}
