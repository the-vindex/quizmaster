package cz.scrumdojo.quizmaster.model;

import cz.scrumdojo.quizmaster.quiz.Quiz;
import cz.scrumdojo.quizmaster.quiz.QuizQuestion;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizRunResult {

    private Integer runId;

    private Quiz quiz;

    private List<QuizQuestionResult> questionResults;

}
