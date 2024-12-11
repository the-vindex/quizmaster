#Feature: Verify running quiz Capital Cities of the World
#
#  Background:
#    Given I create a new quiz 'Capital cities of the World'
#    When I am on the Intro page of quiz
#    Then I start the quiz
#
#  Scenario: Create Quiz, Land on Intro page and continue to First Question
#    And I see the 'What is the capital of Italy?' question for the quiz

#  Scenario: Answer the 'First Question' and continue to 'Second Question'
#    And I see the 'What is the capital of Italy?' question for the quiz
#    When I answer the 'First Question' with 'correct' answer
#    Then I am on the 'Second Question' for 'Capital cities of the World' quiz
#
#  Scenario: Answer the 'Last Question' and continue to 'Summary page'
#    Given I am on the 'Last Question' for 'Capital cities of the World' quiz
#    When I answer the 'Last Question' with 'correct' answer
#    Then I am on the 'Summary page' for 'Capital cities of the World' quiz
#
#  Scenario: Don't answer the 'First Question' and continue without answering any question
#    Given I am on the 'First Question' for 'Capital cities of the World' quiz
#    When I answer the 'First Question' with 'no' answer
#    Then I am unable to continue to the next question
