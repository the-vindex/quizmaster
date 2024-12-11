package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.quiz.validation.PostQuizAnswerValidator;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class QuizAnswerService {

    private final QuizAnswerRepository quizAnswerRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final PostQuizAnswerValidator postQuizAnswerValidator;

    public QuizAnswerService(QuizAnswerRepository quizAnswerRepository,
                             QuizQuestionRepository quizQuestionRepository,
                             PostQuizAnswerValidator postQuizAnswerValidator) {
        this.quizAnswerRepository = quizAnswerRepository;
        this.quizQuestionRepository = quizQuestionRepository;
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

    public MultipleAnswersResult getAnswerFeedback(Integer questionId, List<Integer> selectedAnswers) {

        int[] answersArray = selectedAnswers.stream().mapToInt(Integer::intValue).toArray();

        var wrongAnswersIndexes = quizQuestionRepository.findById(questionId)
            .map(QuizQuestion.getWrongAnswersIndexes(answersArray))
            .orElse(List.of());

        var isAnsweredCorrectly = wrongAnswersIndexes.isEmpty();

        return new MultipleAnswersResult(
                    isAnsweredCorrectly,
                    wrongAnswersIndexes);
    }
}
