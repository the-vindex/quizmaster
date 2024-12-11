package cz.scrumdojo.quizmaster.quiz.validation;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidRequest extends RuntimeException {

    public InvalidRequest(String message) {
        super(message);
    }

}
