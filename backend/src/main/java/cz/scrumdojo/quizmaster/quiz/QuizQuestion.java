package cz.scrumdojo.quizmaster.quiz;

import java.util.function.Function;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity
public class QuizQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String question;

    @Column(name = "answers", columnDefinition = "text[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    private String[] answers;

    @Column(name = "explanations", columnDefinition = "text[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    private String[] explanations;

    private Integer correctAnswer;

    @Transient
    private QuizType quizType;

    public static Function<QuizQuestion, Boolean> isCorrectAnswer(int index) {
        return quizQuestion -> quizQuestion.getCorrectAnswer() == index;
    }
}
