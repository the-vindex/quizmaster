Feature: Answering a quiz question with multiple choice

  Background:
    Given a quiz question "what countries are in Europe?" bookmarked as "Europe" with answers
      | Italy   | correct |
      | France  | correct |
      | Morocco |         |
      | Spain   |         |


  Scenario:
    When I visit the "Europe" quiz-taking page
    Then I select the answer "France"
    Then I select the answer "Italy"
    When I submit the quiz
    Then I should see "Correct!"

#  Scenario Outline:
#    When I visit the "<question>" quiz-taking page
#    And I select the answer "<answer>"
#    And I submit the quiz
#    Then I should see "<feedback>"
#    Examples:
#      | question | answer   | feedback   |
#      | Europe   | Italy     | Correct!   |
#      | Europe   | Morocco  | Incorrect! |




