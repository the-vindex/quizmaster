package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.quiz.QuizQuestion;

interface QuizQuestionValidationRule {

    boolean isValid(QuizQuestion question);

}
