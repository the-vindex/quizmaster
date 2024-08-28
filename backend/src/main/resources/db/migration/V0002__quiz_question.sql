CREATE TABLE quiz_question (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answers TEXT[] NOT NULL
);

INSERT INTO quiz_question (question, answers) VALUES (
    'What is the capital of Italy?',
    '{"Rome", "Naples", "Florence", "Palermo"}'
);
