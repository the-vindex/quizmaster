package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.quiz.QuizQuestion;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizQuestionValidator {

    private final List<QuizQuestionValidationRule> validationRules;

    QuizQuestionValidator(List<QuizQuestionValidationRule> validationRules) {
        this.validationRules = validationRules;
    }

    public boolean isQuestionValid(QuizQuestion question) {
        return validationRules.stream()
            .allMatch(rule -> rule.isValid(question));
    }
}
