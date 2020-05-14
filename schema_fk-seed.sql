USE employee_db;

INSERT INTO department
    (name)
VALUES
    ('Conspiracy Theorist'),
    ('Fake News Writer'),
    ('Insider Trader'),
    ('Payoff'),
    ('The Ministry Of Mis-Information');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Authour', 50000, 1),
    ('Artistic Journalist', 25000, 1),
    ('Lead Trader', 250000, 2),
    ('The Banker', 1500000, 2),
    ('State Senator', 3500000, 3),
    ('Theeee Minister', 1250000, 3),
    ('Dodgy Bloke', 75000,4),
    ('Govt Official - Other', 600000,4),
    ('The President', 250000, 5),
    ('Some Weasle with a wierd name', 190000, 5);