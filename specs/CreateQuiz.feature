Feature: Quiz creation feature


  Scenario: Create a quiz as a quiz maker - happy path
    Given quiz maker opens a quiz creation page
    Then quiz maker is on the quiz creation page

#    When quiz maker chooses id from the table
#    And quiz maker inserts name

#   When quiz maker submits the quiz
#    Then quiz maker sees a correct list of the questions
#    And link for the quiz taker is present
#
#    When quiz taker clicks the link
#    Then quiz taker is on the quiz page
#    And quiz taker sees a correct list of the questions


  Scenario: Create a quiz as a quiz maker - validation error
    Given quiz maker opens a quiz creation page
    Then quiz maker is on the quiz creation page
#
#    When quiz maker does not choose id from the table
#    Then quiz maker sees that expected check boxes are not selected
#
#    When quiz maker submits the quiz
#    Then quiz maker sees a validation error
