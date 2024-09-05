package cz.scrumdojo.quizmaster.quiz;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class QuizController {

    @Transactional
    @PostMapping("/quiz")
    public ResponseEntity<String> createQuiz() {
        return ResponseEntity.status(HttpStatus.CREATED).body("Quiz created");
    }
}