package cz.scrumdojo.quizmaster.model;

import cz.scrumdojo.quizmaster.quiz.QuizQuestion;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizData {

    private String name;

    private List<QuizQuestion> questions;

}
