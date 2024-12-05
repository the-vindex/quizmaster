Feature: Show final result page

  Scenario:
    When I finish quiz
    Then I see the page identifier
    And I see feedback summary
    And I see score
