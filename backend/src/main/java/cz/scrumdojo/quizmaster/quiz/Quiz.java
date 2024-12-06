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
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "quiz", nullable = false)
    private String name;

    @Column(name = "questions", nullable = false)
    @JdbcTypeCode(SqlTypes.ARRAY)
    private Integer[] questions;

}
