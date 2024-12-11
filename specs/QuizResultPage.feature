Feature: Display Results Page

  Scenario: Simple Check
    When I finish quiz
    Then I see the page identifier
    And  I see quiz name
    And I see quizId
    And I see feedback summary
    And I see score

  Scenario: Verify table of results with correct columns and data
    Given I am on the results page
    When I view the results table
    Then the table should have the following columns:
      | Question       |
      | Answer         |
      | Correct Answer |
      | Explanation    |
    And the table should display the following data:
      | Question                       | Answer   | Correct Answers | Explanation                                                                |
      | What is the capital of France? | Paris    | Paris           | Paris is the capital of France.                                            |
      | What are the primary colors?   | Red Blue | Red Blue Green  | Red is a primary color. Blue is a primary color. Green is a primary color. |

  Scenario: Score check
    When I finish quiz
    Then I see the page identifier
    And I see score
    And I see attribute 'success_count' with value '5 z 6'
    And I see attribute 'success_score' with value '83%'
