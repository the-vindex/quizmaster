package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.model.QuizCreateData;
import cz.scrumdojo.quizmaster.model.QuizData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class QuizController {

    private final QuizRepository quizRepository;

    private final QuizQuestionRepository quizQuestionRepository;

    @Autowired
    public QuizController(QuizRepository quizRepository, QuizQuestionRepository quizQuestionRepository) {
        this.quizRepository = quizRepository;
        this.quizQuestionRepository = quizQuestionRepository;
    }

    @Transactional
    @PostMapping("/quiz")
    public ResponseEntity<String> createQuiz(@RequestBody QuizCreateData quizData) {
        if (quizData.getQuestionIds() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<QuizQuestion> quizQuestions = quizQuestionRepository.findAllById(
            Arrays.stream(quizData.getQuestionIds())
                .boxed()
                .collect(Collectors.toList()));

        if (quizQuestions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No questions found for quiz");
        }

        Quiz quiz = Quiz.builder()
            .name(quizData.getName())
            .questions(quizQuestions.stream().map(QuizQuestion::getId).toArray(Integer[]::new))
            .build();

        Integer quizId = quizRepository.save(quiz).getId();

        return ResponseEntity.status(HttpStatus.CREATED).body(String.valueOf(quizId));
    }

    @Transactional
    @GetMapping("/quiz/{id}")
    public ResponseEntity<QuizData> getQuiz(@PathVariable Integer id) {
        Quiz quiz = quizRepository.findById(id).orElse(null);
        QuizData quizData = QuizData.builder()
            .name(quiz.getName())
            .questions(quizQuestionRepository.findAllById(List.of(quiz.getQuestions())))
            .build();

        return quizData != null ? ResponseEntity.ok(quizData) : ResponseEntity.notFound().build();
    }
}
