package cz.scrumdojo.quizmaster.quiz;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Example;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuizRunResultServiceTest {

    @Mock
    private QuizRunRepository quizRunRepository;

    @Mock
    private QuizRepository quizRepository;

    @Mock
    private QuizQuestionRepository quizQuestionRepository;

    @Mock
    private QuizAnswerRepository quizAnswerRepository;

    @Mock
    private QuizAnswerService quizAnswerService;

    @InjectMocks
    private QuizRunResultService quizRunResultService;

    @Test
    void testGetRunResultRunNotFound() {

        // arrange
        var runId = 1;

        when(quizRunRepository.findById(runId))
            .thenReturn(Optional.empty());

        // act, assert
        assertThrows(NotFoundException.class, () -> quizRunResultService.getRunResult(runId));
    }

    @Test
    void testGetRunResultHappyDay() {

        // arrange
        var runId = 1;
        var quizId = 11;
        var questionId1 = 21;
        var questionId2 = 22;
        var answerId1 = 31;
        var answerId2 = 32;

        var quizRun = new QuizRun();
        quizRun.setId(runId);
        quizRun.setQuizId(quizId);

        var quiz = new Quiz();
        quiz.setId(quizId);
        quiz.setName("Quiz name");
        quiz.setQuestions(new Integer[] { questionId1, questionId2 });

        var question1 = new QuizQuestion();
        question1.setId(questionId1);
        question1.setQuestion("Why?");
        question1.setAnswers(new String[] { "Q1 A1", "Q1 A2", "Q1 A3" });
        question1.setCorrectAnswers(new int[] { 1 });
        question1.setQuestionExplanation("Q1 Explanation");
        question1.setExplanations(new String[] { "Q1 A1 Ex", "Q1 A2 Ex", "Q1 A3 Ex" });


        var question2 = new QuizQuestion();
        question2.setId(questionId2);
        question2.setQuestion("What?");
        question2.setAnswers(new String[] { "Q2 A1", "Q2 A2", "Q2 A3", "Q2 A4" });
        question2.setCorrectAnswers(new int[] { 2, 3 });
        question2.setQuestionExplanation("Q2 Explanation");
        question2.setExplanations(new String[] { "Q2 A1 Ex", "Q2 A2 Ex", "Q2 A3 Ex", "Q2 A4 Ex" });

        var answer1 = new QuizAnswer();
        answer1.setId(answerId1);
        answer1.setQuizRunId(runId);
        answer1.setQuestionId(questionId1);
        answer1.setAnswers(new int[] { 1 });

        var answer2 = new QuizAnswer();
        answer2.setId(answerId2);
        answer2.setQuizRunId(runId);
        answer2.setQuestionId(questionId2);
        answer2.setAnswers(new int[] { 1, 2, 4 });

        when(quizRunRepository.findById(runId))
            .thenReturn(Optional.of(quizRun));

        when(quizRepository.findById(quizId))
            .thenReturn(Optional.of(quiz));

        when(quizQuestionRepository.findById(questionId1))
            .thenReturn(Optional.of(question1));

        when(quizQuestionRepository.findById(questionId2))
            .thenReturn(Optional.of(question2));

        var answerSearchExample = new QuizAnswer();
        answerSearchExample.setQuizRunId(runId);

        when(quizAnswerRepository.findAll(Example.of(answerSearchExample)))
            .thenReturn(Arrays.asList(answer1, answer2));

        var feedback = new MultipleAnswersResult(false, List.of(1));

        when(quizAnswerService.getAnswerFeedback(any(Integer.class), anyList()))
            .thenReturn(feedback);

        // act
        var result = quizRunResultService.getRunResult(runId);

        // assert
        assertEquals(runId, result.getRunId());
        assertEquals(quizId, result.getQuiz().getId());
        assertEquals("Quiz name", result.getQuiz().getName());
        assertEquals(2, result.getQuestionResults().size());

        var questionResult1 = result.getQuestionResults().get(0);
        assertEquals(questionId1, questionResult1.getQuestion().getId());
        assertEquals("Why?", questionResult1.getQuestion().getQuestion());
        assertEquals("Q1 Explanation", questionResult1.getQuestion().getQuestionExplanation());
        assertEquals(3, questionResult1.getQuestion().getAnswers().length);
        assertEquals("Q1 A1", questionResult1.getQuestion().getAnswers()[0]);
        assertEquals("Q1 A2", questionResult1.getQuestion().getAnswers()[1]);
        assertEquals("Q1 A3", questionResult1.getQuestion().getAnswers()[2]);
        assertEquals(3, questionResult1.getQuestion().getExplanations().length);
        assertEquals("Q1 A1 Ex", questionResult1.getQuestion().getExplanations()[0]);
        assertEquals("Q1 A2 Ex", questionResult1.getQuestion().getExplanations()[1]);
        assertEquals("Q1 A3 Ex", questionResult1.getQuestion().getExplanations()[2]);
        assertEquals(1, questionResult1.getSelectedAnswers().length);
        assertEquals(1, questionResult1.getSelectedAnswers()[0]);

        // explanation 1 served by mock
        assertEquals(1, questionResult1.getExplanationsToShow().length);
        assertEquals(1, questionResult1.getExplanationsToShow()[0]);

        var questionResult2 = result.getQuestionResults().get(1);
        assertEquals(questionId2, questionResult2.getQuestion().getId());
        assertEquals("What?", questionResult2.getQuestion().getQuestion());
        assertEquals("Q2 Explanation", questionResult2.getQuestion().getQuestionExplanation());
        assertEquals(4, questionResult2.getQuestion().getAnswers().length);
        assertEquals("Q2 A1", questionResult2.getQuestion().getAnswers()[0]);
        assertEquals("Q2 A2", questionResult2.getQuestion().getAnswers()[1]);
        assertEquals("Q2 A3", questionResult2.getQuestion().getAnswers()[2]);
        assertEquals("Q2 A4", questionResult2.getQuestion().getAnswers()[3]);
        assertEquals(4, questionResult2.getQuestion().getExplanations().length);
        assertEquals("Q2 A1 Ex", questionResult2.getQuestion().getExplanations()[0]);
        assertEquals("Q2 A2 Ex", questionResult2.getQuestion().getExplanations()[1]);
        assertEquals("Q2 A3 Ex", questionResult2.getQuestion().getExplanations()[2]);
        assertEquals("Q2 A4 Ex", questionResult2.getQuestion().getExplanations()[3]);
        assertEquals(3, questionResult2.getSelectedAnswers().length);
        assertEquals(1, questionResult2.getSelectedAnswers()[0]);
        assertEquals(2, questionResult2.getSelectedAnswers()[1]);
        assertEquals(4, questionResult2.getSelectedAnswers()[2]);

        // explanation 1 served by mock
        assertEquals(1, questionResult2.getExplanationsToShow().length);
        assertEquals(1, questionResult2.getExplanationsToShow()[0]);
    }
}
