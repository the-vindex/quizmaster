Feature: Question explanation

    Background:
    Given a quiz question "What is the capital of Italy?" bookmarked as "Italy" with answers
      | Rome     | correct |
      | Naples   |         |
      | Florence |         |
      | Palermo  |         |
    And a quiz question "What is the capital of France?" bookmarked as "France" with answers
      | Marseille |         |
      | Lyon      |         |
      | Paris     | correct |
      | Toulouse  |         |

  Scenario Outline:
    When I visit the "<question>" quiz-taking page
    And I select the answer "<answer>"
    And I submit the quiz
    Then I should see "<feedback>"
    And I should see question explanation "<question explanation>"
    Examples:
      | question | answer   | feedback   | question explanation |
      | Italy    | Rome     | Correct!   | Question Explanation |
      | Italy    | Palermo  | Incorrect! | Question Explanation |
      | France   | Paris    | Correct!   | Question Explanation |
      | France   | Toulouse | Incorrect! | Question Explanation |
