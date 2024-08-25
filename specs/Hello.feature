Feature: Hello World!

  Scenario: Display hello message from the backend
    Given I navigate to the home page
    Then I should see the title "Quizmaster"
    And I should see the message "Hello World!"
