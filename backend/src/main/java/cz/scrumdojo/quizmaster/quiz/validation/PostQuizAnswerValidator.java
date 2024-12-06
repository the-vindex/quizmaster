package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.quiz.*;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class PostQuizAnswerValidator {

    private final QuizRepository quizRepository;
    private final QuizRunRepository quizRunRepository;

    public PostQuizAnswerValidator(
        QuizRepository quizRepository,
        QuizRunRepository quizRunRepository
    ) {
        this.quizRepository = quizRepository;
        this.quizRunRepository = quizRunRepository;
    }

    public void validate(Integer runId, Integer questionId) {
        QuizRun quizRun = quizRunRepository.findById(runId)
            .orElseThrow(() -> new NotFoundException("Quiz run with id " + runId + " not found"));

        Quiz quiz = quizRepository.findById(quizRun.getQuizId())
            .orElseThrow(() -> new IllegalStateException("Quiz with id " + quizRun.getQuizId() + " linked in quiz run with id " + quizRun.getId() + " not found."));

        if ( ! Arrays.asList(quiz.getQuestions()).contains(questionId)) {
            throw new InvalidRequest("Quiz does not contain question with id " + questionId);
        }
    }

}
