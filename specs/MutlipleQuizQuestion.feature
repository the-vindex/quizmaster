Feature: Answering a quiz question with multiple choice

  Scenario Outline:
    Given a question "What countries are in Europe?"
    * with answers:
      | Italy   | * |
      | France  | * |
      | Morocco |   |
      | Spain   | * |
    * with explanation "Italy, France, and Spain are in Europe. Morocco is in Africa."
    * saved and bookmarked as "Europe"
    When I take question "Europe"
    And I answer "<answer>"
    Then I see feedback "<feedback>"
    And I see the question explanation
    Examples:
      | answer                        | feedback   |
      | Italy                         | Incorrect! |
      | Italy, France                 | Incorrect! |
      | Italy, France, Morocco        | Incorrect! |
      | Italy, France, Spain          | Correct!   |
      | Italy, France, Morocco, Spain | Incorrect! |
