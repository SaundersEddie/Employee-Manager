-- Initial seeding of employee_db
-- Eddie Saunders saunders.eddie@outlook.com 2nd May 2020
-- These files should be executed within in mySQL workbench

USE employee_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Eddie", "Saunders",1,1),
("Test","User 1",1, 2),
("Test","User 2",3, 2);

INSERT INTO department (dept_name)
VALUE ("Engineering"),
("Human Resources"),
("The Ministry Of Misinformation");

INSERT INTO role (title, salary, department_id)
VALUE ("Nub", 50000,1),
("Conspiracy Theory Writer", 120000,3),
("Test Employee", 27000,2);