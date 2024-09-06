package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.quiz.QuizQuestion;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class NotEmptyAnswersValidationRuleTest {

    private NotEmptyAnswersValidationRule validationRule = new NotEmptyAnswersValidationRule();

    @Test
    void validQuestion() {
        QuizQuestion question = new QuizQuestion();
        question.setAnswers(new String[] {"Rome", "Paris"});
        assertTrue(validationRule.isValid(question));
    }

    @Test
    void invalidQuestion() {
        QuizQuestion question = new QuizQuestion();
        question.setAnswers(new String[] {"", null});
        assertFalse(validationRule.isValid(question));
    }

}
