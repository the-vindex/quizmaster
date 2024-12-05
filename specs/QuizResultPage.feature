Feature: Display Results Page

  Scenario: Simple Check
    When I finish quiz
    Then I see the page identifier
    And  I see quiz name
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
      | Question | Answer | Correct Answers | Explanation |
      | A        | B      | C               | D           |
      | D        | D      | D               | D           |

