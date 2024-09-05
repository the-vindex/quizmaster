Feature: Multiple choice - feedback per answer feature


  Background:
    Given a quiz question "what countries are in Europe?" bookmarked as "Europe" with answers
      | Italy   | correct |
      | France  | correct |
      | Morocco |         |
      | Spain   |         |


  Scenario: Multiple choice - feedback per answer - happy path
    Given I visit the "Europe" quiz-taking page
    Then quiz taker is on the quiz page
    And quiz taker sees question with multiple choise

    When I select the answer "France"
    And I select the answer "Italy"
    And I submit the quiz
#    Then quiz taker sees the <result>
#
#    Examples:
#      | answers | result |
#      |         |        |
