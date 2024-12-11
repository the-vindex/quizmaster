package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.quiz.QuizQuestion;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AtLeastOneCorrectAnswerValidationRuleTest {

    private final AtLeastOneCorrectAnswerValidationRule validationRule = new AtLeastOneCorrectAnswerValidationRule();

    @ParameterizedTest
    @MethodSource("provideDataForValidQuestion")
    void validQuestion(
        int[] correctAnswers
    ) {
        QuizQuestion question = new QuizQuestion();
        question.setAnswers(new String[] {"Rome", "Paris", "Prague"});
        question.setCorrectAnswers(correctAnswers);
        assertTrue(validationRule.isValid(question));
    }

    @ParameterizedTest
    @MethodSource("provideDataForInvalidQuestion")
    void invalidQuestion(
        int[] correctAnswers
    ) {
        QuizQuestion question = new QuizQuestion();
        question.setAnswers(new String[] {"Rome", "Paris", "Prague"});
        question.setCorrectAnswers(correctAnswers);
        assertFalse(validationRule.isValid(question));
    }

    private static Stream<Arguments> provideDataForValidQuestion() {
        return Stream.of(
            Arguments.of(new int[] {0}),
            Arguments.of(new int[] {0, 1}),
            Arguments.of(new int[] {0, 1, 2})
        );
    }

    private static Stream<Arguments> provideDataForInvalidQuestion() {
        return Stream.of(
            Arguments.of(new int[] {})
        );
    }


}
