Feature: Question explanation

  Background:
    Given a quiz question "What is the capital of Italy?" bookmarked as "Italy" with answers and question explanation "The city is famous for the Colosseum and the Vatican, and was also the center of the Ancient Roman Empire."
      | Rome     | correct |
      | Naples   |         |
      | Florence |         |
      | Palermo  |         |

    And a quiz question "What is the capital of Germany?" bookmarked as "Germany" with answers
      | Berlin    | correct |
      | Munich    |         |
      | Hamburg   |         |
      | Frankfurt |         |


  Scenario Outline:
    When I visit the "<question>" quiz-taking page
    And I select the answer "<answer>"
    And I submit the quiz
    Then I should see "<feedback>"
    And I should see question explanation "<question explanation>"
    Examples:
      | question | answer    | feedback   | question explanation                                                                                       |
      | Italy    | Rome      | Correct!   | The city is famous for the Colosseum and the Vatican, and was also the center of the Ancient Roman Empire. |
      | Italy    | Palermo   | Incorrect! | The city is famous for the Colosseum and the Vatican, and was also the center of the Ancient Roman Empire. |
      | Germany  | Berlin    | Correct!   |                                                                                                            |
      | Germany  | Frankfurt | Incorrect! |                                                                                                            |
