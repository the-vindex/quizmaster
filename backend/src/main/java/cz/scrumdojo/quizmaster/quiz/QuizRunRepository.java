package cz.scrumdojo.quizmaster.quiz;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRunRepository extends JpaRepository<QuizRun, Integer> {
}
