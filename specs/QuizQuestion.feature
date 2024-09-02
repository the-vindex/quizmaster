Feature: Answering a quiz question

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


  Scenario:
    When I visit the "Italy" quiz-taking page
    Then I should see the question
    And I should see the answers

  Scenario Outline:
    When I visit the "<question>" quiz-taking page
    And I select the answer "<answer>"
    And I submit the quiz
    Then I should see "<feedback>"
    Examples:
      | question | answer   | feedback   |
      | Italy    | Rome     | Correct!   |
      | Italy    | Palermo  | Incorrect! |
      | France   | Paris    | Correct!   |
      | France   | Toulouse | Incorrect! |
