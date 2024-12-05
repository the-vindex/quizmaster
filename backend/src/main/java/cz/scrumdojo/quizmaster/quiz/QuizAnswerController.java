package cz.scrumdojo.quizmaster.quiz;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class QuizAnswerController {

    private final QuizAnswerService quizAnswerService;

    public QuizAnswerController(QuizAnswerService quizAnswerService) {
        this.quizAnswerService = quizAnswerService;
    }

    @PostMapping("/quizRun/{runId}/question/{questionId}/answer")
    public ResponseEntity<Integer> postAnswer(@PathVariable("runId") Integer runId,
                                              @PathVariable("questionId") Integer questionId,
                                              @RequestBody Answers answers) {
        try {
            return ResponseEntity.ok(quizAnswerService.addAnswer(runId, questionId, answers.getAnswerIds()));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
