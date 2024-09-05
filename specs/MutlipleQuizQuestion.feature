Feature: Answering a quiz question with multiple choice

  Background:
    Given a quiz question "what countries are in Europe?" bookmarked as "Europe" with answers
      | Italy   | correct |
      | France  | correct |
      | Morocco |         |
      | Spain   |         |

#TODO Please fix it out!
#  Scenario Outline:
#    When I visit the "Europe" quiz-taking page
#    Then I select the answer "<answer>"
#    When I submit the quiz
#    Then I should see "<response>"
#
#    Examples:
#      | answer                     | response   |
#      | Italy                      | Incorrect! |
#      | Italy,France               | Correct!   |
#      | Italy,France,Morocco       | Incorrect! |
#      | Italy,France,Morocco,Spain | Incorrect! |


#  Scenario Outline:
#    When I visit the "<question>" quiz-taking page
#    And I select the answer "<answer>"
#    And I submit the quiz
#    Then I should see "<feedback>"
#    Examples:
#      | question | answer   | feedback   |
#      | Europe   | Italy     | Correct!   |
#      | Europe   | Morocco  | Incorrect! |




