package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.model.QuizCreateData;
import cz.scrumdojo.quizmaster.model.QuizData;
import cz.scrumdojo.quizmaster.model.QuizScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class QuizController {

    private final QuizRepository quizRepository;
    private final QuizRunRepository quizRunRepository;
    private final QuizQuestionRepository quizQuestionRepository;

    @Autowired
    public QuizController(QuizRepository quizRepository, QuizRunRepository quizRunRepository, QuizQuestionRepository quizQuestionRepository) {
        this.quizRepository = quizRepository;
        this.quizRunRepository = quizRunRepository;
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
        if (quiz == null) {
            return ResponseEntity.notFound().build();
        }
        QuizData quizData = QuizData.builder()
            .name(quiz.getName() == null ? "" : quiz.getName())
            .questions(quizQuestionRepository.findAllById(List.of(quiz.getQuestions())))
            .build();

        return ResponseEntity.ok(quizData);
    }

    @Transactional
    @GetMapping("/quiz/all")
    public ResponseEntity<List<QuizData>> getAllQuizes() {
        List<Quiz> quizes = quizRepository.findAll();

        if (quizes.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        List<QuizData> quizesData = new ArrayList<QuizData>();
        for (Quiz quiz : quizes) {
            quizesData.add(QuizData.builder()
            .id(quiz.getId())
            .name(quiz.getName() == null ? "" : quiz.getName()).build());
        }
        return ResponseEntity.ok(quizesData); 
    }

    @Transactional
    @PostMapping("/quizRun/{id}")
    public ResponseEntity<Integer> runQuiz(@PathVariable Integer id) {

        Quiz quiz = quizRepository.findById(id).orElse(null);
        if (quiz == null) {
            return ResponseEntity.notFound().build();
        }
        
        QuizRun quizRun = QuizRun.builder()
        .quizId(id)
        .runState("RUNNING")
        .creationDate(new Timestamp(System.currentTimeMillis()))
        .build();
        Integer quizRunId = quizRunRepository.save(quizRun).getId();

        return ResponseEntity.ok(quizRunId); 
    }

    @Transactional
    @GetMapping("/quiz/score/{runId}")
    public ResponseEntity<QuizScore> QuizScore(@PathVariable Integer runId) {
        QuizScore quizScore = new QuizScore(6, 5);

        return ResponseEntity.ok(quizScore); 
    }
}
