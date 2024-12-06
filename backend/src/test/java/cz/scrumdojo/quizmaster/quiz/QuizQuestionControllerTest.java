package cz.scrumdojo.quizmaster.quiz;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class QuizQuestionControllerTest {

    @Autowired
    private QuizQuestionController quizQuestionController;

    private QuizQuestion createQuestion() {
        return createQuestionBuilderBase()
            .correctAnswer(1)
            .build();
    }

    private static QuizQuestion.QuizQuestionBuilder createQuestionBuilderBase() {
        return QuizQuestion.builder()
            .question("What is the capital of Italy?")
            .answers(new String[]{"Naples", "Rome", "Florence", "Palermo"})
            .explanations(new String[]{"Nope", "Never", "You wish", "Bleh"});
    }

    @Test
    public void getQuestion() {
        var question = createQuestion();
        var questionId = quizQuestionController.saveQuestion(question);

        var result = quizQuestionController.getQuestion(questionId).getBody();

        assertNotNull(result);
        assertEquals(question.getQuestion(), result.getQuestion());
        assertArrayEquals(question.getAnswers(), result.getAnswers());
    }

    @Test
    public void nonExistingQuestion() {
        ResponseEntity<?> response = quizQuestionController.getQuestion(-1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    public void answerQuestion(int answerIdx, boolean isCorrect) {
        var questionId = quizQuestionController.saveQuestion(createQuestion());

        var result = quizQuestionController.answerQuestion(questionId, answerIdx).getBody();

        assertNotNull(result);
        assertEquals(isCorrect, result);
    }

    @Test
    public void answerMultipleQuestionsCorrectly() {
        checkMultipleAnswers(List.of(1,3), true, List.of());
    }

    @Test
    public void answerMultipleQuestionsIncorrectly() {
        checkMultipleAnswers(List.of(2), false, List.of(1, 2, 3));
    }

    private void checkMultipleAnswers(List<Integer> userAnswersIndexes, boolean isCorrect, List<Integer> expectedWrongAnswers) {
        QuizQuestion question = createQuestionBuilderBase()
            .correctAnswers(new int[]{1,3})
            .build();

        var questionId = quizQuestionController.saveQuestion(question);

        MultipleAnswersResult result = quizQuestionController.answerMultipleChoice(questionId, userAnswersIndexes).getBody();

        assertNotNull(result);
        assertEquals(isCorrect, result.getQuestionAnsweredCorrectly());

        assertEquals(expectedWrongAnswers,result.getWrongAnswers());
    }

    @Test
    public void answerSingleChoiceQuestionCorrectly() {
        answerQuestion(1, true);
    }

    @Test
    public void answerNonExistingQuestion() {
        ResponseEntity<?> response = quizQuestionController.answerQuestion(-1, 0);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void returnAllQuestions() {
        ResponseEntity<?> response = quizQuestionController.getAllQuestionList();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }
}
