CREATE TABLE hello_message (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL
);

INSERT INTO hello_message (message) VALUES ('Hello World!');
