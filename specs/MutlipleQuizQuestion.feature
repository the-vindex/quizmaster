Feature: Answering a quiz question with multiple choice

  @focus
  Scenario Outline: :
    Given a question "What countries are in Europe?"
    * with answers:
      | Italy   | * |
      | France  | * |
      | Morocco |   |
      | Spain   | * |
    * saved and bookmarked as "Europe"
    When I take question "Europe"
    And I answer "<answer>"
    Then I see feedback "<feedback>"
    Examples:
      | answer                        | feedback   |
      | Italy                         | Incorrect! |
      | Italy, France                 | Incorrect! |
      | Italy, France, Morocco        | Incorrect! |
      | Italy, France, Spain          | Correct!   |
      | Italy, France, Morocco, Spain | Incorrect! |
