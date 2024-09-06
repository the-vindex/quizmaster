Feature: View explanations for answers after responding to a question

  Background:
    Given a quiz question "What is the capital of Italy?" bookmarked as "Italy" with answers
      | Rome     | correct | Rome is the capital of Italy         |
      | Naples   |         | Naples is not the capital of Italy   |
      | Florence |         | Florence is not the capital of Italy |
      | Palermo  |         | Palermo is not the capital of Italy  |
    Given a quiz question "When should a developer dramatically run out of a meeting?" bookmarked as "SCRUM" with answers
      | When the Product Owner asks for a change mid-sprint         |         | Mid-sprint changes are annoying, but running out of the meeting would lead to chaos rather than solving the issue. |
      | When they run out of coffee                                 |         | Coffee might fuel developers, but meetings are important. The coffee can wait (or bring a thermos!).               |
      | When the meeting lasts more than 15 minutes                 |         | Some meetings can last longer than 15 minutes, but their length should be reasonable. Running away won't fix it.   |
      | Never – the developer is responsible for team communication | correct | Developers are key to smooth teamwork, which means staying engaged in meetings and contributing to communication!  |

  Scenario Outline:
    When I visit the "<question>" quiz-taking page
    And I select the answer "<answer>"
    And I submit the quiz
    And I should see the explanation "<explanation>"
    Examples:
      | question | answer                                                      | explanation                                                                                                        |
      | Italy    | Rome                                                        | Rome is the capital of Italy                                                                                       |
      | Italy    | Palermo                                                     | Palermo is not the capital of Italy                                                                               |
      | SCRUM    | When the Product Owner asks for a change mid-sprint         | Mid-sprint changes are annoying, but running out of the meeting would lead to chaos rather than solving the issue. |
      | SCRUM    | When they run out of coffee                                 | Coffee might fuel developers, but meetings are important. The coffee can wait (or bring a thermos!).               |
      | SCRUM    | When the meeting lasts more than 15 minutes                 | Some meetings can last longer than 15 minutes, but their length should be reasonable. Running away won't fix it.   |
      | SCRUM    | Never – the developer is responsible for team communication | Developers are key to smooth teamwork, which means staying engaged in meetings and contributing to communication!  |
