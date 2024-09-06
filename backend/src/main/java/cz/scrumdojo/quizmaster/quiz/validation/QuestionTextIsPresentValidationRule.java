package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.quiz.QuizQuestion;
import org.springframework.stereotype.Component;

import static org.apache.commons.lang3.StringUtils.isNoneBlank;

@Component
public class QuestionTextIsPresentValidationRule implements QuizQuestionValidationRule {

    @Override
    public boolean isValid(QuizQuestion question) {
        return isNoneBlank(question.getQuestion());
    }

}
