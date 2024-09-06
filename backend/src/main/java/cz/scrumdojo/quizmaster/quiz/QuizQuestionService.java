package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.quiz.validation.InvalidQuestionException;
import cz.scrumdojo.quizmaster.quiz.validation.QuizQuestionValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizQuestionService {

    private final QuizQuestionRepository quizQuestionRepository;

    private final QuizQuestionValidator quizQuestionValidator;

    public Integer saveQuestion(QuizQuestion question) {
        if (quizQuestionValidator.isQuestionValid(question)) {
            return quizQuestionRepository.save(question).getId();
        } else {
            throw new InvalidQuestionException("Invalid question");
        }
    }

}
