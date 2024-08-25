package cz.scrumdojo.quizmaster.hello;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HelloMessageRepository extends JpaRepository<HelloMessage, Integer> {
}
