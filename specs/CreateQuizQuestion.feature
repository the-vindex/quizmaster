Feature: Create a quiz question

  Scenario:
    When I visit the create question page
    Then I should see the create question form
    And I enter question "What is capital of Italy?"
    And I enter answers:
      | Rome     | correct | Rome is the capital of Italy         |
      | Naples   |         | Naples is not the capital of Italy   |
      | Florence |         | Florence is not the capital of Italy |
      | Palermo  |         | Palermo is not the capital of Italy  |
    When I submit question
    Then I received question link
