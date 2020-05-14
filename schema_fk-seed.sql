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
    ('The Banker', 150000, 2),
    ('State Senator', 3500000, 3),
    ('Theeee Minister', 1250000, 3),
    ('Dodgy Bloke', 75000,4),
    ('Govt Official - Other', 600000,4),
    ('The President', 250000, 5),
    ('Some Weasle with a wierd name', 190000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Eddie', 'Saunders', 1, NULL),
    ('Fred', 'Blogs', 2, 1),
    ('Steve', 'Smith', 3, NULL),
    ('Bruce', 'Dickenson', 4, 3),
    ('Ray', 'Reardon', 5, NULL),
    ('Eric', 'Bristow', 6, 5),
    ('Andy', 'Jones', 7, NULL),
    ('Stan', 'Lee', 8, 7);
