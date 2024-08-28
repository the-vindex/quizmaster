package cz.scrumdojo.quizmaster.quiz;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class QuizQuestionController {

    @GetMapping("/quiz-question")
    public QuizQuestion getQuestion() {
        QuizQuestion quizQuestion = new QuizQuestion();
        quizQuestion.setQuestion("What is the capital of Italy?");
        quizQuestion.setAnswers(new String[]{"Rome", "Naples", "Florence", "Palermo"});

        return quizQuestion;
    }
}
