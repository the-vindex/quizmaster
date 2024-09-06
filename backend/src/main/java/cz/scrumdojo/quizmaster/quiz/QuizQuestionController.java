package cz.scrumdojo.quizmaster.quiz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class QuizQuestionController {

    private final QuizQuestionRepository quizQuestionRepository;

    @Autowired
    public QuizQuestionController(QuizQuestionRepository quizQuestionRepository) {
        this.quizQuestionRepository = quizQuestionRepository;
    }

    @Transactional
    @GetMapping("/quiz-question/{id}")
    public ResponseEntity<QuizQuestion> getQuestion(@PathVariable Integer id) {

        return response(findQuestion(id));
    }

    @Transactional
    @PostMapping("/quiz-question")
    public Integer saveQuestion(@RequestBody QuizQuestion question) {
        if (question.getCorrectAnswers() == null) {
            question.setCorrectAnswers(new int[] {question.getCorrectAnswer()});
        }
        return quizQuestionRepository.save(question).getId();
    }

    @Transactional
    @GetMapping("/quiz-question/{id}/answer/{index}")
    public ResponseEntity<Boolean> answerQuestion(@PathVariable Integer id, @PathVariable int index) {
        return response(findQuestion(id).map(QuizQuestion.isCorrectAnswer(index)));
    }

    @Transactional
    @PostMapping("/quiz-question/{id}/answer")
    public ResponseEntity<Boolean> answerQuestionV2(@PathVariable Integer id, @RequestBody List<Integer> answers) {
        int [] answersArray = answers.stream().mapToInt(Integer::intValue).toArray();
        return response(findQuestion(id).map(QuizQuestion.isCorrectAnswers(answersArray)));
    }

    @Transactional
    @GetMapping("/quiz-question/all")
    public ResponseEntity<List<QuizQuestion>> getAllQuestionList() {
        List<QuizQuestion> quizQuestions = quizQuestionRepository.findAll();
        return ResponseEntity.ok().body(quizQuestions);
    }

    private Optional<QuizQuestion> findQuestion(Integer id) {
        return quizQuestionRepository.findById(id);
    }

    private <T> ResponseEntity<T> response(Optional<T> entity) {
        return entity
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}

