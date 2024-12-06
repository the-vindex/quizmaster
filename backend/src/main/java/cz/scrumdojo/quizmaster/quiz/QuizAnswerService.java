package cz.scrumdojo.quizmaster.quiz;

import org.springframework.stereotype.Service;

@Service
public class QuizAnswerService {

    private final QuizAnswerRepository quizAnswerRepository;
    private final QuizRunRepository quizRunRepository;
    private final QuizQuestionRepository quizQuestionRepository;

    public QuizAnswerService(QuizAnswerRepository quizAnswerRepository,
                             QuizRunRepository quizRunRepository,
                             QuizQuestionRepository quizQuestionRepository) {
        this.quizAnswerRepository = quizAnswerRepository;
        this.quizRunRepository = quizRunRepository;
        this.quizQuestionRepository = quizQuestionRepository;
    }

    public Integer addAnswer(Integer runId, Integer questionId, int[] answers) {
        quizRunRepository.findById(runId).orElseThrow(() -> new NotFoundException("Quiz run with id " + runId + "not found"));
        quizQuestionRepository.findById(questionId).orElseThrow(() -> new NotFoundException("Quiz question with id " + questionId + " not found"));

        QuizAnswer quizAnswer = new QuizAnswer();
        quizAnswer.setQuestionId(questionId);
        quizAnswer.setQuizRunId(runId);
        quizAnswer.setAnswers(answers);
        return quizAnswerRepository.save(quizAnswer).getId();
    }

}
