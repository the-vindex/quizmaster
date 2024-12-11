package cz.scrumdojo.quizmaster.quiz;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Set;
import java.util.HashSet;

public class XorSetTests {

    @Test
    void xorSetReturnsElementsOnlyInOneSet() {
        Set<Integer> set1 = new HashSet<>(Set.of(1, 2, 3));
        Set<Integer> set2 = new HashSet<>(Set.of(3, 4, 5));
        Set<Integer> expected = new HashSet<>(Set.of(1, 2, 4, 5));
        assertEquals(expected, QuizQuestion.xorSet(set1, set2));
    }

    @Test
    void xorSetReturnsEmptySetForIdenticalSets() {
        Set<Integer> set1 = new HashSet<>(Set.of(1, 2, 3));
        Set<Integer> set2 = new HashSet<>(Set.of(1, 2, 3));
        Set<Integer> expected = new HashSet<>();
        assertEquals(expected, QuizQuestion.xorSet(set1, set2));
    }

    @Test
    void xorSetReturnsAllElementsForDisjointSets() {
        Set<Integer> set1 = new HashSet<>(Set.of(1, 2, 3));
        Set<Integer> set2 = new HashSet<>(Set.of(4, 5, 6));
        Set<Integer> expected = new HashSet<>(Set.of(1, 2, 3, 4, 5, 6));
        assertEquals(expected, QuizQuestion.xorSet(set1, set2));
    }
}
