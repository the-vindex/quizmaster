package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.quiz.validation.PostQuizAnswerValidator;
import org.springframework.stereotype.Service;

@Service
public class QuizAnswerService {

    private final QuizAnswerRepository quizAnswerRepository;
    private final PostQuizAnswerValidator postQuizAnswerValidator;

    public QuizAnswerService(QuizAnswerRepository quizAnswerRepository,
                             PostQuizAnswerValidator postQuizAnswerValidator) {
        this.quizAnswerRepository = quizAnswerRepository;
        this.postQuizAnswerValidator = postQuizAnswerValidator;
    }

    public Integer addAnswer(Integer runId, Integer questionId, int[] answers) {
        postQuizAnswerValidator.validate(runId, questionId);

        QuizAnswer quizAnswer = new QuizAnswer();
        quizAnswer.setQuestionId(questionId);
        quizAnswer.setQuizRunId(runId);
        quizAnswer.setAnswers(answers);
        return quizAnswerRepository.save(quizAnswer).getId();
    }

}
