Feature: Question explanation

  Background:
    Given a quiz question "What is the capital of France?" bookmarked as "France" with answers and question explanation "general explanation"
      | Marseille |         |
      | Lyon      |         |
      | Paris     | correct |
      | Toulouse  |         |

    And a quiz question "What is the capital of Italy?" bookmarked as "Italy" with answers and question explanation "general explanation"
      | Rome     | correct | Rome is the capital of Italy         |
      | Naples   |         | Naples is not the capital of Italy   |
      | Florence |         | Florence is not the capital of Italy |
      | Palermo  |         | Palermo is not the capital of Italy  |

    And a quiz question "What is the capital of Germany?" bookmarked as "Germany" with answers
      | Berlin    | correct | Berlin is the capital of Germany        |
      | Munich    |         | Munich is not the capital of Germany    |
      | Hamburg   |         | Hamburg is not the capital of Germany   |
      | Frankfurt |         | Frankfurt is not the capital of Germany |

    And a quiz question "What countries are in Europe?" bookmarked as "Europe" with answers and question explanation "general explanation"
      | Italy   | correct | Italy is the country in Europe       |
      | France  | correct | France is the country in Europe      |
      | Morocco |         | Morocco is not the country in Europe |
      | Spain   |         | Spain is not the country in Europe   |

#    TODO in multiple question type the second correct option marked as incorrect
  Scenario Outline:
    When I visit the "<question>" quiz-taking page
    And I select the answer "<answer>"
    And I submit the quiz
    Then I should see "<feedback>"
    And I should see question explanation "<question explanation>"
    Examples:
      | question | answer    | feedback   | question explanation |
      | Italy    | Rome      | Correct!   | general explanation  |
      | Italy    | Palermo   | Incorrect! | general explanation  |
      | France   | Paris     | Correct!   | general explanation  |
      | France   | Toulouse  | Incorrect! | general explanation  |
      | Germany  | Berlin    | Correct!   |                      |
      | Germany  | Frankfurt | Incorrect! |                      |
      | Europe   | Italy     | Correct!   | general explanation  |
#      | Europe   | France    | Correct!   | general explanation  |
      | Europe   | Morocco   | Incorrect! | general explanation  |
