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
        return QuizQuestion.builder()
            .question("What is the capital of Italy?")
            .answers(new String[]{"Naples", "Rome", "Florence", "Palermo"})
            .explanations(new String[]{"Nope", "Never", "You wish", "Bleh"} )
            .correctAnswer(1)
            .build();
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

    public void answerQuestionV2(List<Integer> answerIdx, boolean isCorrect) {
        var questionId = quizQuestionController.saveQuestion(createQuestion());

        Boolean result = quizQuestionController.answerQuestionV2(questionId, answerIdx).getBody();

        assertNotNull(result);
        assertEquals(isCorrect, result);
    }

    @Test
    public void answerQuestionV3_CorrectAnswer() {
        List<Integer> answerIdx = List.of(1);
        boolean isCorrect = true;

        var questionId = quizQuestionController.saveQuestion(createQuestion());

        MultipleAnswersResult result = quizQuestionController.answerQuestionV3(questionId, answerIdx).getBody();

        assertNotNull(result);
        assertEquals(isCorrect, result.getQuestionAnsweredCorrectly());
        assertTrue(result.getWrongAnswers().isEmpty());
    }

    @Test
    public void answerQuestionCorrectly() {
        answerQuestion(1, true);
    }

    @Test
    public void answerQuestionIncorrectly() {
        answerQuestionV2(List.of(0), false);
    }

    @Test
    public void answerMultipleQuestionsCorrectly() {
        answerQuestionV2(List.of(1), true);
    }

    @Test
    public void answerMultipleQuestionsIncorrectly() {
        answerQuestionV2(List.of(0), false);
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
