package cz.scrumdojo.quizmaster.quiz;

import java.util.*;
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

    private String questionExplanation;

    @Column(name = "correct_answers", columnDefinition = "text[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    private int[] correctAnswers;

    @Transient
    private int correctAnswer;

    @Transient
    private QuizType quizType;

    public static Function<QuizQuestion, Boolean> isCorrectAnswer(int index) {
        return quizQuestion -> quizQuestion.getCorrectAnswers().length == 1
            && quizQuestion.getCorrectAnswers()[0] == index;
    }

    public static Function<QuizQuestion, Boolean> isCorrectAnswers(int[] userAnswers) {
        return quizQuestion -> {
            int[] correctAnswers = quizQuestion.getCorrectAnswers();

            if (correctAnswers.length != userAnswers.length) {
                return false;
            }

            // Step 2: Convert both arrays to sets
            Set<Integer> set1 = new HashSet<>();
            Set<Integer> set2 = new HashSet<>();

            for (int num : correctAnswers) {
                set1.add(num);
            }

            for (int num : userAnswers) {
                set2.add(num);
            }

            return set1.equals(set2);
        };
    }
}
