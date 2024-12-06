package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.model.QuizQuestionResult;
import cz.scrumdojo.quizmaster.model.QuizRunResult;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizRunResultService {

    private final QuizQuestionRepository quizQuestionRepository;

    private final QuizAnswerRepository quizAnswerRepository;

    private final QuizRepository quizRepository;

    private final QuizRunRepository quizRunRepository;

    private final QuizAnswerService quizAnswerService;

    public QuizRunResult getRunResult(Integer runId) {

        var run = quizRunRepository
            .findById(runId)
            .orElseThrow(() -> new NotFoundException("Quiz run with id " + runId + "not found"));

        var quiz = quizRepository
            .findById(run.getQuizId())
            .orElseThrow(() -> new NotFoundException("Quiz not found"));

        var answerSearchExample = new QuizAnswer();
        answerSearchExample.setQuizRunId(runId);

        var answers = quizAnswerRepository.findAll(Example.of(answerSearchExample));

        var questionResults = new ArrayList<QuizQuestionResult>();

        for(var questionId : quiz.getQuestions()) {

            var question = quizQuestionRepository
                .findById(questionId)
                .orElseThrow(() -> new NotFoundException("Question not found"));

            var answer = answers.stream()
                .filter(x -> x.getQuestionId().equals(questionId))
                .findFirst();

            if (answer.isEmpty()) {

                // TODO handle null answer properly

                var defaultAnswer = new QuizAnswer();

                answer = Optional.of(defaultAnswer);
            }

            var selectedAnswers = answer.get().getAnswers();

            var questionResult = new QuizQuestionResult();
            questionResult.setQuestion(question);
            questionResult.setSelectedAnswers(selectedAnswers);

            var feedback = quizAnswerService.getAnswerFeedback(questionId, Arrays.stream(selectedAnswers).boxed().toList());
            questionResult.setExplanationsToShow(feedback.getAnswersRequiringFeedback().stream().mapToInt(i->i).toArray());

            questionResults.add(questionResult);

        }

        var result = new QuizRunResult();
        result.setRunId(runId);
        result.setQuiz(quiz);
        result.setQuestionResults(questionResults);

        return result;
    }

}
