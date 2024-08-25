package cz.scrumdojo.quizmaster.hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    private final HelloMessageRepository repository;

    @Autowired
    public HelloController(HelloMessageRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/api/hello")
    public String hello() {
        return repository.findById(1).get().getMessage();
    }
}
