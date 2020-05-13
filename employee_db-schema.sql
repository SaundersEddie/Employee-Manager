-- Initial Database and table build
-- Eddie Saunders saunders.eddie@outlook.com 2nd May 2020
-- These files should be executed within in mySQL workbench

-- Create the Database then create the following 3 tables
-- employee Table
-- department table
-- role table

DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Create our employee table in the employee_db
USE employee_db;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT, 
    dept_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL,
    department_id VARCHAR (30),
    PRIMARY KEY (id)
 --    FOREIGN KEY (department_id)
	-- 	REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, -- This is tied to role table id (PK)
    manager_id INT, -- This appears to be an FK 
    department_id VARCHAR (30), -- Foreign Key?
    PRIMARY KEY (id)
);



