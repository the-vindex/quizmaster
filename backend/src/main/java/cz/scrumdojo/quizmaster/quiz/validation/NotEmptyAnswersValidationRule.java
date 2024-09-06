package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.quiz.QuizQuestion;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import static java.util.Arrays.stream;

@Component
public class NotEmptyAnswersValidationRule implements QuizQuestionValidationRule {

    @Override
    public boolean isValid(QuizQuestion question) {
        return stream(question.getAnswers()).allMatch(StringUtils::isNotBlank);
    }

}
