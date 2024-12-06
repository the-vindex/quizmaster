Feature: Validation create question input
    @focus
    Scenario: All required fields are empty
        Given visit create question form
        When click submit button
        Then 'Fill all required fields.' message is displayed

    @focus
    Scenario: Question is empty
        Given visit create question form
        When enter <answer> answers:
            | answer |
            | 1      |
            | 2      |
        * check <correctAnswers> correct answer:
            | correctAnswers |
            | 2 |
        * click submit button
        Then 'Question must be filled.' message is displayed

    @focus
    Scenario: No answer added
        Given visit create question form
        When enter question
        * click submit button
        Then 'At least 2 answers must be filled.' message is displayed

    @focus
    Scenario: No answer is marked as the correct one
        Given visit create question form
        When enter question
        * enter <answer> answers:
            | answer |
            | 1      |
            | 2      |
        * click submit button
        Then 'At least one answer must be selected as correct answer.' message is displayed

    @focus
    Scenario: Only one answer is filled in
        Given visit create question form
        When enter question
        * enter <answer> answers:
            | answer |
            | 1      |
        * check <correctAnswers> correct answer:
            | correctAnswers |
            | 1              |
        * click submit button
        Then 'Question must have at least 2 answers' message is displayed

    @focus
    Scenario: Multiple possible answers check box is unchecked after checking multiple answers as correct ones
        Given visit create question form
        When enter question
        * mark the question as multiple possible answers
        * enter <answer> answers:
            | answer |
            | 1 |
            | 2 |
            | 3 |
            | 4 |
        * check <correctAnswers> correct answer:
            | correctAnswers |
            | 1 |
            | 2 |
            | 3 |
            | 4 |
        * mark the question as multiple possible answers
        * click submit button
        Then 'Multiple answers are checked but the test is considered as a single answer only.' message is displayed

# # from here all tests are positive
    @focus
    Scenario: All answers are marked as correct ones
        Given visit create question form
        When enter question
        * mark the question as multiple possible answers
        * enter <answer> answers:
            | answer |
            | 1      |
            | 2      |
            | 3      |
            | 4      |
        * check <correctAnswers> correct answer:
            | correctAnswers |
            | 1              |
            | 2              |
            | 3              |
            | 4              |
        * click submit button
        Then link to the question is created

    @focus
    Scenario: All fields are filled in
        Given visit create question form
        When enter question
        * mark the question as multiple possible answers
        * enter <answer> answers:
            | answer |
            | 1      |
            | 2      |
            | 3      |
            | 4      |
        * check <correctAnswers> correct answer:
            | correctAnswers |
            | 1              |
            | 2              |
            | 3              |
        * enter <explanations> for answer
            | explanations   |
            | 1              |
            | 2              |
            | 3              |
            | 4              |
        * enter general explanation for the entire question
        * click submit button
        Then link to the question is created