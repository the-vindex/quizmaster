package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.quiz.QuizQuestion;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AtLeastOneCorrectAnswerValidationRuleTest {

    private final AtLeastOneCorrectAnswerValidationRule validationRule = new AtLeastOneCorrectAnswerValidationRule();

    @Test
    void validQuestion() {
        QuizQuestion question = new QuizQuestion();
        question.setAnswers(new String[] {"Rome", "Paris"});
        question.setCorrectAnswers(new int[] {0});
        assertTrue(validationRule.isValid(question));
    }

    @Test
    void invalidQuestion() {
        QuizQuestion question = new QuizQuestion();
        assertFalse(validationRule.isValid(question));
    }

}
