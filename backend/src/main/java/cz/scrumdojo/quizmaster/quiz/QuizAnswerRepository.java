package cz.scrumdojo.quizmaster.quiz;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAnswerRepository extends JpaRepository<QuizAnswer, Integer> {
}
