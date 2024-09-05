Feature: View explanations for answers after responding to a question

  Background:
    Given a quiz question "What is the capital of Italy?" bookmarked as "Italy" with answers
      | Rome     | correct | Rome is the capital of Italy         |
      | Naples   |         | Naples is not the capital of Italy   |
      | Florence |         | Florence is not the capital of Italy |
      | Palermo  |         | Palermo is not the capital of Italy  |

  Scenario Outline:
    When I visit the "<question>" quiz-taking page
    And I select the answer "<answer>"
    And I submit the quiz
    Then I should see "<feedback>"
    And I should see the explanation "<explanation>"
    Examples:
      | question | answer   | feedback   | explanation                            |
      | Italy    | Rome     | Correct!   | Rome is the capital of Italy           |
      | Italy    | Palermo  | Incorrect! | Palermo is not the capital of Italy    |
