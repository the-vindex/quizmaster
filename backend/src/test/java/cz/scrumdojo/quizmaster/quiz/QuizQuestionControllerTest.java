package cz.scrumdojo.quizmaster.quiz;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class QuizQuestionControllerTest {

    @Autowired
    private QuizQuestionController quizQuestionController;

    @Test
    public void getQuestion() {
        QuizQuestion result = quizQuestionController.getQuestion();

        assertEquals("What is the capital of Italy?", result.getQuestion());

        assertEquals(4, result.getAnswers().length);
        assertEquals("Rome", result.getAnswers()[0]);
        assertEquals("Naples", result.getAnswers()[1]);
        assertEquals("Florence", result.getAnswers()[2]);
        assertEquals("Palermo", result.getAnswers()[3]);
    }
}
