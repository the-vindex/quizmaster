Feature: Verify running quiz Capital Cities of the World

  Scenario: Land on Intro page and continue to First Question
    Given I am on the Intro page of 'Capital cities of the World' quiz
    When I start the quiz
    Then I see the 'First Question' for 'Capital cities of the World' quiz

  Scenario: Answer the 'First Question' and continue to 'Second Question'
    Given I am on the 'First Question' for 'Capital cities of the World' quiz
    When I answer the 'First Question' with 'correct' answer
    Then I am on the 'Second Question' for 'Capital cities of the World' quiz

  Scenario: Answer the 'Last Question' and continue to 'Summary page'
    Given I am on the 'Last Question' for 'Capital cities of the World' quiz
    When I answer the 'Last Question' with 'correct' answer
    Then I am on the 'Summary page' for 'Capital cities of the World' quiz

  Scenario: Don't answer the 'First Question' and continue without answering any question
    Given I am on the 'First Question' for 'Capital cities of the World' quiz
    When I answer the 'First Question' with 'no' answer
    Then I am unable to continue to the next question
