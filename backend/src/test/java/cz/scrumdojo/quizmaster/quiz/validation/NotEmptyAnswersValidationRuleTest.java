package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.quiz.QuizQuestion;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class NotEmptyAnswersValidationRuleTest {

    private NotEmptyAnswersValidationRule validationRule = new NotEmptyAnswersValidationRule();

    @ParameterizedTest
    @MethodSource("provideDataForValidQuestion")
    void validQuestion(
        List<String> answers
    ) {
        QuizQuestion question = new QuizQuestion();
        question.setAnswers(answers.toArray(new String[0]));
        assertTrue(validationRule.isValid(question));
    }

    @ParameterizedTest
    @MethodSource("provideDataForInvalidQuestion")
    void invalidQuestion(
        List<String> answers
    ) {
        QuizQuestion question = new QuizQuestion();
        question.setAnswers(answers.toArray(new String[0]));
        assertFalse(validationRule.isValid(question));
    }

    private static Stream<Arguments> provideDataForValidQuestion() {
        return Stream.of(
            Arguments.of(List.of("Rome", "Paris")),
            Arguments.of(List.of("Rome", "Paris", "London"))
        );
    }

    private static Stream<Arguments> provideDataForInvalidQuestion() {
        List<String> nullElement = new ArrayList<>();
        nullElement.add(null);
        return Stream.of(
            Arguments.of(List.of("" )),
            Arguments.of(List.of("    " )),
            Arguments.of(nullElement)
        );
    }

}
