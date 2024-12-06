package cz.scrumdojo.quizmaster.quiz;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@EqualsAndHashCode
@ToString
public class QuizAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "quiz_run_id", nullable = false)
    private Integer quizRunId;

    @Column(name = "question_id", nullable = false)
    private Integer questionId;

    @Column(name = "answers", columnDefinition = "text[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    private int[] answers;

}
