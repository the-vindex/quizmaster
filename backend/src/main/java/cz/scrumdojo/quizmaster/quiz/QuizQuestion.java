package cz.scrumdojo.quizmaster.quiz;

import lombok.Data;

@Data
public class QuizQuestion {
    private String question;
    private String[] answers;
}
