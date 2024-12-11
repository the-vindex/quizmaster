package cz.scrumdojo.quizmaster.quiz;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class QuizAnswerControllerTest {

    private static final int VALID_RUN_ID = 1;
    private static final int[] VALID_ANSWERS_ID = new int[] {1, 2};
    private static final int VALID_QUESTION_ID = 2;
    private static final int INVALID_QUESTION_ID = -1;

    @Mock
    private QuizAnswerService quizAnswerService;

    @InjectMocks
    private QuizAnswerController quizAnswerController;

    @Test
    public void shouldThrowExceptionWhenNoQuizFound() {
        when(quizAnswerService.addAnswer(VALID_RUN_ID, INVALID_QUESTION_ID, VALID_ANSWERS_ID))
            .thenThrow(new NotFoundException("Not found"));

        ResponseEntity<Integer> response = quizAnswerController.postAnswer(
            VALID_RUN_ID,
            INVALID_QUESTION_ID,
            new Answers(new int[] {1, 2})
        );

        assertTrue(response.getStatusCode().is4xxClientError());
    }

    @Test
    public void shouldReturnIdWhenAnswerAdded() {
        int expectedAnswerId = 3;
        when(quizAnswerService.addAnswer(VALID_RUN_ID, VALID_QUESTION_ID, VALID_ANSWERS_ID))
            .thenReturn(expectedAnswerId);

        ResponseEntity<Integer> response = quizAnswerController.postAnswer(
            VALID_RUN_ID,
            VALID_QUESTION_ID,
            new Answers(new int[] {1, 2})
        );

        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertEquals(expectedAnswerId, response.getBody());
    }

}
