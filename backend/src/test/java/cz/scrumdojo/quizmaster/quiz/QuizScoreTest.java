package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.model.QuizScore;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class QuizScoreTest {

    @Test
    void calculateScoreTest() {

        Integer expected = 83; // 83%

        Integer totalCount = 6;
        Integer correctCount = 5;
        QuizScore quizScore = new QuizScore(totalCount, correctCount);

        assertEquals(expected, quizScore.score);
    }
}