Feature: Answering a quiz question

  Scenario:
    Given I create a quiz question "What is the capital of Italy?" with answers
      | Rome     |
      | Naples   |
      | Florence |
      | Palermo  |
    When I visit the quiz-taking page
    Then I should see the question
    And I should see the answers

  Scenario Outline:
    Given I create a quiz question "What is the capital of France?" with answers
      | Marseille |         |
      | Lyon      |         |
      | Paris     | correct |
      | Toulouse  |         |
    When I visit the quiz-taking page
    And I select the answer "<answer>"
    And I submit the quiz
    Then I should see "<feedback>"
    Examples:
      | answer    | feedback   |
      | Marseille | Incorrect! |
      | Lyon      | Incorrect! |
      | Paris     | Correct!   |
      | Toulouse  | Incorrect! |
