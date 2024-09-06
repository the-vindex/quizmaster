Feature: Answering a quiz question with multiple choice

  Background:
    Given a quiz question "what countries are in Europe?" bookmarked as "Europe" with answers
      | Italy   | correct |
      | France  | correct |
      | Morocco |         |
      | Spain   | correct |

  Scenario Outline:
    When I visit the "Europe" quiz-taking page
    Then I select the answer "<answer>"
    When I submit the quiz
    Then I should see "<response>"

    Examples:
      | answer                     | response   |
      | Italy                      | Incorrect! |
      | Italy,France               | Incorrect! |
      | Italy,France,Morocco       | Incorrect! |
      | Italy,France,Spain         | Correct!   |
      | Italy,France,Morocco,Spain | Incorrect! |
