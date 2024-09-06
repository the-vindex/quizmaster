package cz.scrumdojo.quizmaster.model;

import lombok.*;

@Data
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class QuizCreateData {

    @NonNull
    private String name;

    private int[] questionIds;

}
