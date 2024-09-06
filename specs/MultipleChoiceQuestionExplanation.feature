Feature: Multiple choice question explanation

  Background:
    Given a quiz question "Which of the below cities of Czech Republic are in UNESCO heritage?" bookmarked as "Czech" with answers and question explanation "One city is famous for Sedlec Ossuary and St. Barbara Cathedral, and the other one located in South Moravia with unique architectural"
      | Kutna Hora | correct |
      | Brno       |         |
      | Pardubice  |         |
      | Lednice    | correct |

#    TODO in multiple question type in progress
  @ignore
  Scenario Outline:
    When I visit the "<question>" quiz-taking page
    And I select the answer "<answer>"
    And I submit the quiz
    Then I should see "<feedback>"
    And I should see question explanation "One city is famous for Sedlec Ossuary and St. Barbara Cathedral, and the other one located in South Moravia with unique architectural"
    Examples:
      | question | answer     | feedback   |
      | Czech    | Kutna Hora | Correct!   |
#      | Czech    | Lednice    | Correct!   |
      | Czech    | Pardubice  | Incorrect! |
