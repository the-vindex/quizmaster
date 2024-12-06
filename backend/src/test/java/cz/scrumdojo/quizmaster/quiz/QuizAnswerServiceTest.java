package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.quiz.validation.PostQuizAnswerValidator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QuizAnswerServiceTest {

    private static final int VALID_QUIZ_RUN_ID = 1;
    private static final int VALID_QUIZ_QUESTION_ID = 2;
    private static final int INVALID_QUIZ_RUN_ID = -1;
    private static final int INVALID_QUIZ_QUESTION_ID = -2;

    @Mock
    private QuizAnswerRepository quizAnswerRepository;

    @Spy
    private PostQuizAnswerValidator postQuizAnswerValidator = new PostQuizAnswerValidator(null, null);

    @InjectMocks
    private QuizAnswerService quizAnswerService;

    @Test
    void testAddAnswerHappyDay() {
        final int[] answers = {1, 2, 3};

        doNothing().when(postQuizAnswerValidator).validate(VALID_QUIZ_RUN_ID, VALID_QUIZ_QUESTION_ID);

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
    void testAddAnswerValidationFailed() {
        final int[] answers = {1, 2, 3};

        doThrow(new NotFoundException("Not found"))
            .when(postQuizAnswerValidator).validate(INVALID_QUIZ_RUN_ID, INVALID_QUIZ_QUESTION_ID);

        assertThrows(NotFoundException.class, () -> quizAnswerService.addAnswer(INVALID_QUIZ_RUN_ID, INVALID_QUIZ_QUESTION_ID, answers));
    }
}
