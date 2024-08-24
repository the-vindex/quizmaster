package cz.scrumdojo.quizmaster.hello;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class HelloControllerTest {
    private final HelloController helloController = new HelloController();

    @Test
    public void testHello() {
        String result = helloController.hello();
        assertEquals("Hello World!", result);
    }
}
