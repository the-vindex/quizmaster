package cz.scrumdojo.quizmaster.quiz;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

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

    public static Function<QuizQuestion, Boolean> isCorrectAnswer(int index) {
        return quizQuestion -> quizQuestion.getCorrectAnswers().length == 1
            && quizQuestion.getCorrectAnswers()[0] == index;
    }

    public static Function<QuizQuestion, List<Integer>> getWrongAnswersIndexes(int[] userAnswers) {
        return quizQuestion -> {
            int[] correctAnswers = quizQuestion.getCorrectAnswers();

            Set<Integer> correctAnswerSet = Arrays.stream(correctAnswers)
                .boxed()
                .collect(Collectors.toSet());

            Set<Integer> userAnswerSet = Arrays.stream(userAnswers)
                .boxed()
                .collect(Collectors.toSet());

            return xorSet(correctAnswerSet, userAnswerSet).stream().toList();
        };
    }

    // Returns numbers present only in one of the sets
    public static Set<Integer> xorSet(Set<Integer> set1, Set<Integer> set2) {
        Set<Integer> xor = new HashSet<>(set1);
        xor.addAll(set2);
        Set<Integer> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        xor.removeAll(intersection);
        return xor;
    }
}
