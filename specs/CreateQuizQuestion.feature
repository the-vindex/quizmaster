Feature: Create a quiz question

  Scenario: client successfully submit question
    When I visit the create question page
    Then I should see the create question form
    And I enter question "What is capital of Italy?"
    And I enter answers:
      | Rome     | correct | Rome is the capital of Italy         |
      | Naples   |         | Naples is not the capital of Italy   |
      | Florence |         | Florence is not the capital of Italy |
      | Palermo  |         | Palermo is not the capital of Italy  |
    And I enter general explanation "Rome is the capital city of Italy. It is also the capital of the Lazio region"
    When I submit question
    Then I received question link


  @ignore
  Scenario: client see warning when trying to submit only one answer
    When I visit the create question page
    Then I should see the create question form
    And I enter question "What is capital of Italy?"
    And I enter answers:
      | Rome | correct | Rome is the capital of Italy |
    And I enter general explanation "Rome is the capital city of Italy. It is also the capital of the Lazio region"
    When I submit question
    Then I see warning "Invalid question"


  @ignore
  Scenario: client see warning when trying to submit question without any correct answer
    When I visit the create question page
    Then I should see the create question form
    And I enter question "What is capital of Italy?"
    And I enter answers:
      | Rome     |  | Rome is the capital of Italy         |
      | Naples   |  | Naples is not the capital of Italy   |
    And I enter general explanation "Rome is the capital city of Italy. It is also the capital of the Lazio region"
    When I submit question
    Then I see warning "Invalid question"
