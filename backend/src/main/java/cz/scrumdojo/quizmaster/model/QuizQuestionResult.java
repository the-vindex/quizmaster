package cz.scrumdojo.quizmaster.model;

import cz.scrumdojo.quizmaster.quiz.QuizQuestion;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizQuestionResult {

    private QuizQuestion question;

    private int[] selectedAnswers;

    private int[] explanationsToShow;

}
