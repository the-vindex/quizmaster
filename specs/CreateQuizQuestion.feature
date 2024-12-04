Feature: Create a quiz question

  Scenario: client successfully submit question
    Given a question "What is capital of Italy?"
    * with answers:
      | Rome     | * | Rome is the capital of Italy         |
      | Naples   |   | Naples is not the capital of Italy   |
      | Florence |   | Florence is not the capital of Italy |
      | Palermo  |   | Palermo is not the capital of Italy  |
    * with explanation "Rome is the capital city of Italy. It is also the capital of the Lazio region"
    * saved and bookmarked as "Italy"
    When I take question "Italy"
    Then I see the question
