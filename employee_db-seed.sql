-- Initial seeding of employee_db
-- Eddie Saunders saunders.eddie@outlook.com 2nd May 2020

USE employee_db;

INSERT INTO employee (first_name, last_name, manager_id)
VALUES ("Eddie", "Saunders",1);

INSERT INTO department (dept_name)
VALUE ("Engineering");

INSERT INTO user_role (title, salary)
VALUE ("Nub", 50000);