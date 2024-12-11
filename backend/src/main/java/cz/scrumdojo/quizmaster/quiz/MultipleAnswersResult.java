package cz.scrumdojo.quizmaster.quiz;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@Builder
public class MultipleAnswersResult {
    private final Boolean questionAnsweredCorrectly;
    private final List<Integer> answersRequiringFeedback;

}
