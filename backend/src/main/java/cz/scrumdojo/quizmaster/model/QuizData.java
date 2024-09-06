package cz.scrumdojo.quizmaster.model;

import lombok.Data;
import lombok.NonNull;

@Data
public class QuizData {

    @NonNull
    private String name;

    private int[] questionIds;

}
