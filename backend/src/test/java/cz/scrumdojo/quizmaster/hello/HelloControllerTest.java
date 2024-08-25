package cz.scrumdojo.quizmaster.hello;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class HelloControllerTest {
    @Autowired
    private HelloController helloController;

    @Test
    public void testHello() {
        String result = helloController.hello();
        assertEquals("Hello World!", result);
    }
}
