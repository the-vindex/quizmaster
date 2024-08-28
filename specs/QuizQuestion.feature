Feature: Answering a quiz question

  Scenario:
    Given I visit the quiz-taking page
    Then I should see the question "What is the capital of Italy?"
    And I should see the answers
      | Rome     |
      | Naples   |
      | Florence |
      | Palermo  |
