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
