package cz.scrumdojo.quizmaster.quiz;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuizAnswerServiceTest {

    private static final int VALID_QUIZ_RUN_ID = 1;
    private static final int VALID_QUIZ_QUESTION_ID = 2;
    private static final int INVALID_QUIZ_RUN_ID = -1;
    private static final int INVALID_QUIZ_QUESTION_ID = -2;

    @Mock
    private QuizRunRepository quizRunRepository;

    @Mock
    private QuizQuestionRepository quizQuestionRepository;

    @Mock
    private QuizAnswerRepository quizAnswerRepository;

    @InjectMocks
    private QuizAnswerService quizAnswerService;

    @Test
    void testAddAnswerHappyDay() {
        final int[] answers = {1, 2, 3};

        when(quizRunRepository.findById(VALID_QUIZ_RUN_ID))
            .thenReturn(Optional.of(QuizRun.builder()
                .id(VALID_QUIZ_RUN_ID)
                .build()));

        when(quizQuestionRepository.findById(VALID_QUIZ_QUESTION_ID))
            .thenReturn(Optional.of(QuizQuestion.builder()
                .id(VALID_QUIZ_QUESTION_ID)
                .build()));

        when(quizAnswerRepository.save(QuizAnswer.builder()
                .answers(answers)
                .quizRunId(VALID_QUIZ_RUN_ID)
                .questionId(VALID_QUIZ_QUESTION_ID)
                .build()))
            .thenReturn(QuizAnswer.builder()
                .id(1)
                .build());

        quizAnswerService.addAnswer(VALID_QUIZ_RUN_ID, VALID_QUIZ_QUESTION_ID, answers);
    }

    @Test
    void testAddAnswerQuizRunNotFound() {
        final int[] answers = {1, 2, 3};

        when(quizRunRepository.findById(INVALID_QUIZ_RUN_ID))
            .thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> quizAnswerService.addAnswer(INVALID_QUIZ_RUN_ID, VALID_QUIZ_QUESTION_ID, answers));
    }

    @Test
    void testAddAnswerQuizAnswerNotFound() {
        final int[] answers = {1, 2, 3};

        when(quizRunRepository.findById(VALID_QUIZ_RUN_ID))
            .thenReturn(Optional.of(QuizRun.builder()
                .id(VALID_QUIZ_RUN_ID)
                .build()));

        when(quizQuestionRepository.findById(INVALID_QUIZ_QUESTION_ID))
            .thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> quizAnswerService.addAnswer(VALID_QUIZ_RUN_ID, INVALID_QUIZ_QUESTION_ID, answers));
    }
}
