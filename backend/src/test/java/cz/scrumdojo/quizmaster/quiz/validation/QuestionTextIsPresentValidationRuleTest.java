package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.quiz.QuizQuestion;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class QuestionTextIsPresentValidationRuleTest {

    private QuestionTextIsPresentValidationRule validationRule = new QuestionTextIsPresentValidationRule();

    @Test
    void validQuestion() {
        QuizQuestion question = new QuizQuestion();
        question.setQuestion("What is the capital city of Italy?");
        assertTrue(validationRule.isValid(question));
    }

    @Test
    void invalidQuestion() {
        QuizQuestion question = new QuizQuestion();
        assertFalse(validationRule.isValid(question));
    }

}
