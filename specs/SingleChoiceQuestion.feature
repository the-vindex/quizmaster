Feature: Create a quiz question

  Background:
    Given a question "What is capital of France?"
    * with answers:
      | Marseille |   |
      | Lyon      |   |
      | Paris     | * |
      | Toulouse  |   |
    * saved and bookmarked as "France"

  Scenario: Question is created and available to be taken
    Given I take question "France"
    Then I see the question and the answers

  Scenario Outline:
    Given I take question "France"
    When I answer "<answer>"
    Then I see feedback "<feedback>"
    Examples:
      | answer | feedback   |
      | Paris  | Correct!   |
      | Lyon   | Incorrect! |

  Scenario Outline:
    And a question "What is capital of Italy?"
    * with answers:
      | Rome     | * | Rome is the capital of Italy         |
      | Naples   |   | Naples is not the capital of Italy   |
      | Florence |   | Florence is not the capital of Italy |
      | Palermo  |   | Palermo is not the capital of Italy  |
    * with explanation "Rome is the capital city of Italy. It is also the capital of the Lazio region"
    * saved and bookmarked as "Italy"
    When I take question "Italy"
    And I answer "<answer>"
    Then I see feedback "<feedback>"
    And I see the answer explanation "<explanation>"
    And I see the question explanation
    Examples:
      | answer | feedback   | explanation                        |
      | Rome   | Correct!   | Rome is the capital of Italy       |
      | Naples | Incorrect! | Naples is not the capital of Italy |
