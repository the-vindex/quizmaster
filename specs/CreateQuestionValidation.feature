Feature: Validation create question input
#     @focus
#     Scenario: All required fields are empty
#         Given visit create question form
#         When click submit button
#         Then 'Fill all required fields.' message is displayed

#     @focus
#     Scenario: Question is empty
#         Given visit create question form
#         When enter [1, 2] answers
#         * check [1] correct answer
#         * click submit button
#         Then 'Question must be filled.' message is shown

#     @focus
#     Scenario: No answer added
#         Given visit create question form
#         When enter question
#         * click submit button
#         Then 'Answers must be filled' message is shown

#     @focus
#     Scenario: No answer is marked as the correct one
#         Given visit create question form
#         When enter question
#         * enter [1, 2] answers
#         * click submit button
#         Then 'At least one answer must be selected as correct answer' message is shown

#     @focus
#     Scenario: Only one answer is filled in
#         Given visit create question form
#         When enter question
#         * enter [1] answer
#         * check correct [1] answer
#         * click submit button
#         Then 'Question must have at least 2 answers' message is shown

#     @focus
#     Scenario: Multiple possible answers check box is unchecked after checking multiple answers as correct ones
#         Given visit create question form
#         When enter question
#         * mark the question as multiple possible answers
#         * enter [1, 2, 3, 4] answers
#         * check [1, 2, 3, 4] correct answers
#         * mark the question as multiple possible answers
#         * click submit button
#         Then 'Multiple answers are checked but the test is considered as a single answer only ' message is shown

# # from here all tests are positive
#     @focus
#     Scenario: All answers are marked as correct ones
#         Given visit create question form
#         When enter question
#         * mark the question as multiple possible answers
#         * enter [1, 2, 3, 4] answers
#         * check [1, 2, 3, 4] correct answers
#         * click submit button
#         Then link to the question is created

#     @focus
#     Scenario: All fields are filled in
#         Given visit create question form
#         When enter question
#         * mark the question as multiple possible answers
#         * enter [1, 2, 3, 4] answers
#         * check [1, 2, 3] correct answers
#         * enter [1, 2, 3, 4] explanation for answer
#         * enter general explanation
#         * click submit button