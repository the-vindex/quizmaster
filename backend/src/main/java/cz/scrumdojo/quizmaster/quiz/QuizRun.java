package cz.scrumdojo.quizmaster.quiz;

import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class QuizRun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "quiz_id", nullable = false)
    private Integer quizId;

    @Column(name = "run_state", nullable = false)
    private String runState;

    @Column(name = "creation_date", nullable = false)
    private Timestamp creationDate;

    @Column(name = "completion_date", nullable = true)
    private Timestamp completionDate;
}
