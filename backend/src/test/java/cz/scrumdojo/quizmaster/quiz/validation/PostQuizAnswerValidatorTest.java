package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.quiz.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PostQuizAnswerValidatorTest {

    private static final int VALID_QUIZ_ID = 1;
    private static final int VALID_QUIZ_RUN_ID = 1;
    private static final int INVALID_QUIZ_RUN_ID = -1;
    private static final int INVALID_QUIZ_ID = -2;

    @Mock
    private QuizRepository quizRepository;

    @Mock
    private QuizRunRepository quizRunRepository;

    @InjectMocks
    private PostQuizAnswerValidator validator;


    @Test
    void testValidateHappyDay() {
        when(quizRunRepository.findById(VALID_QUIZ_RUN_ID))
            .thenReturn(Optional.of(QuizRun.builder()
                .quizId(VALID_QUIZ_ID)
                .build()));

        when(quizRepository.findById(VALID_QUIZ_ID))
            .thenReturn(Optional.of(Quiz.builder()
                .questions(new Integer[] {1, 2, 3})
                .build()));

        validator.validate(VALID_QUIZ_RUN_ID, 2);
    }

    @Test
    void testValidateQuizRunNotFound() {
        when(quizRunRepository.findById(INVALID_QUIZ_RUN_ID))
            .thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> validator.validate(INVALID_QUIZ_RUN_ID, 2));
    }

    @Test
    void testValidateQuizNotFound() {
        when(quizRunRepository.findById(VALID_QUIZ_RUN_ID))
            .thenReturn(Optional.of(QuizRun.builder()
                .quizId(INVALID_QUIZ_ID)
                .build()));

        when(quizRepository.findById(INVALID_QUIZ_ID))
            .thenReturn(Optional.empty());

        assertThrows(IllegalStateException.class, () -> validator.validate(VALID_QUIZ_RUN_ID, 2));
    }

    @Test
    void testValidateQuestionNotPartOfQuiz() {
        when(quizRunRepository.findById(VALID_QUIZ_RUN_ID))
            .thenReturn(Optional.of(QuizRun.builder()
                .quizId(VALID_QUIZ_ID)
                .build()));

        when(quizRepository.findById(VALID_QUIZ_ID))
            .thenReturn(Optional.of(Quiz.builder()
                .questions(new Integer[] {1, 2, 3})
                .build()));

        assertThrows(InvalidRequest.class, () -> validator.validate(VALID_QUIZ_RUN_ID, 4));
    }
}
