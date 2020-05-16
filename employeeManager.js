// Employee Manager front end
// This reminds me of those old school green screen applications that gave you a headache and made your eyes
// bleed after 25 minutes of use...

// This app uses the following NPMpackages:
// mysql, inquirer, and console.table

// Eddie Saunders saunders.eddie@outlook.com 2md May2020
// EXS 7th May 2020 - Conversion to ES6 standards

// const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// EXS es6 type connection?
const { createConnection } = require('mysql');

// Build our connection string and connect to the database
const connection = createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "WestHam666!!", // naughty naughty code
    database: "employee_db"
});

connection.connect((err) => {
    if (err) throw err;
    console.clear();
    console.log("connected as id " + connection.threadId);
    displayLogo();
    getUserInput();
});

const getUserInput = () => {
    //console.clear();
    // EXS - get our user input, made this a callable function as the user needs to return here after they perform the selection
    return inquirer.prompt({
            name: "userSelection",
            type: "list",
            message: "What would you like to do today?",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add New Employee",
                "Add New Department",
                "Add New Role",
                // "View All Employees by Department",
                // "View All Employees by Manager",
                // "Delete Employee",
                // "Delete Department",
                // "Delete Role",
                "Update Employee Role",
                // "Update Employee Manager",
                "Leave This Application"
            ]
        })
        .then(answer => {
            switch (answer.userSelection) {
                case ("View All Employees"):
                    viewAllEmployees();
                    break;
                case ("View All Departments"):
                    viewAllDepartments();
                    break;
                case ("View All Roles"):
                    viewAllRoles();
                    break;
                case ("Add New Employee"):
                    addNewEmployee();
                    break;
                case ("Add New Department"):
                    addNewDepartment();
                    break;
                case ("Add New Role"):
                    addNewRole();
                    break;
                case ("View All Employees by Department"):
                    viewAllEmployeesByDepartment();
                    break;
                    // case ("View All Employees by Manager"):
                    //     viewAllEmployeesByManager();
                    //     break;
                    // case ("Delete Employee"):
                    //     deleteEmployee();
                    //     break;
                    // case ("Delete Department"):
                    //     deleteDepartment();
                    //     break;
                    // case ("Delete Role"):
                    //     deleteRole();
                    //     break;
                case ("Update Employee Role"):
                    updateEmployeeRole();
                    break;
                    // case ("Update Employee Manager"):
                    //     updateEmployeeManager();
                    //     break;
                case ("Leave This Application"):
                    console.log("Toodle pip!");
                    connection.end();
                    break;
                default:
                    console.log("An Error Occurred");
                    connection.end();
            }
        });
}

const viewAllEmployees = () => {
    const ourQuery = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title FROM employee INNER JOIN role ON employee.role_id = role.id";
    connection.query(ourQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        getUserInput();
    });
}

const viewAllDepartments = () => {
    const ourQuery = "SELECT * FROM department";
    connection.query(ourQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        getUserInput();
    });
}

const viewAllRoles = () => {
    const ourQuery = "SELECT * FROM role";
    connection.query(ourQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        getUserInput();
    })
}

const addNewEmployee = () => {
    inquirer
        .prompt([{
            name: "newFirstName",
            type: "input",
            message: "What in the new employees first name"
        }, {
            name: "newLastName",
            type: "input",
            message: "What in the new employees last name"
        }, {
            name: "newRole",
            type: "input",
            message: "What in the new employees Role"
        }])
        .then(function(answer) {
            connection.query("INSERT INTO employee SET ?", {
                    first_name: answer.newFirstName,
                    last_name: answer.newLastName,
                    role_id: answer.newRole
                },
                function(err) {
                    if (err) throw err;
                    console.log("User Added")
                    viewAllEmployees();
                }
            );
        });
}

const addNewDepartment = () => {
    inquirer
        .prompt([{
            name: "newDeptName",
            type: "input",
            message: "What in the new department name"
        }])
        .then(function(answer) {
            connection.query("INSERT INTO department SET ?", {
                    name: answer.newDeptName,
                },
                function(err) {
                    if (err) throw err;
                    console.log("Department Added")
                    viewAllDepartments();
                }
            );
        });
}

const addNewRole = () => {
    inquirer
        .prompt([{
            name: "newRoleTitle",
            type: "input",
            message: "What in the new role title?"
        }, {
            name: "newRoleSalary",
            type: "input",
            message: "What in the new role salary?"
        }, {
            name: "newRoleDeptID",
            type: "input",
            message: "What in the new role department ID?"
        }])
        .then(function(answer) {
            connection.query("INSERT INTO role SET ?", {
                    title: answer.newRoleTitle,
                    salary: answer.newRoleSalary,
                    department_id: answer.newRoleDeptID
                },
                function(err) {
                    if (err) throw err;
                    console.log("Role Added")
                    viewAllRoles();
                }
            );
        });
}

const updateEmployeeRole = () => {
    inquirer
        .prompt([{
            name: "employeeName",
            message: "Please enter employee number"
        }, {
            name: "newEmployeeRole",
            message: "What in the employees new role?"
        }])
        .then(function(answer) {
            connection.query(`UPDATE employee SET employee.role_id=${answer.newEmployeeRole} WHERE employee.id=${answer.employeeName}`, function(err) {
                if (err) throw err;
                console.log("Role Updated")
                viewAllEmployees();
            });
        });
}

// const viewAllByDept = () => {
//     console.log("View All By Dept");
// }

// const deleteEmployee = () => {
//     inquirer
//         .prompt([{
//             name: "whackedEmployee",
//             type: "input",
//             message: "What is the employee to whack"
//         }])
//         .then(function(answer) {
//             // ourQuery = `DELETE FROM employee WHERE id = ${answer.employeeID}`;
//             connection.query(`DELETE FROM employee WHERE id = ${answer.whackedEmployee}`,
//                 function(err) {
//                     if (err) throw err;
//                     console.log("Employee Deleted")
//                     getUserInput();
//                 }
//             );
//         });
// }

// const deleteRole = () => {
//     inquirer
//         .prompt([{
//             name: "deleteRoleID",
//             type: "input",
//             message: "What is the role to delete"
//         }])
//         .then(function(answer) {
//             // ourQuery = `DELETE FROM employee WHERE id = ${answer.employeeID}`;
//             connection.query(`DELETE FROM role WHERE id = ${answer.deleteRoleID}`,
//                 function(err) {
//                     if (err) throw err;
//                     console.log("Role Deleted")
//                     getUserInput();
//                 }
//             );
//         });
// }

const displayLogo = () => {
    console.log('8888888888                        888                                     ');
    console.log('888                               888                                     ');
    console.log('888                               888                                     ');
    console.log('8888888    88888b.d88b.  88888b.  888  .d88b.  888  888  .d88b.   .d88b.  ');
    console.log('888        888 "888 "88b 888 "88b 888 d88""88b 888  888 d8P  Y8b d8P  Y8b ');
    console.log('888        888  888  888 888  888 888 888  888 888  888 88888888 88888888 ');
    console.log('888        888  888  888 888 d88P 888 Y88..88P Y88b 888 Y8b.     Y8b.     ');
    console.log('8888888888 888  888  888 88888P"  888  "Y88P"   "Y88888  "Y8888   "Y8888  ');
    console.log('                         888                        888                   ');
    console.log('                         888                   Y8b d88P                   ');
    console.log('                         888                    "Y88P"                    ');
    console.log('8888888b.           888             888                                   ');
    console.log('888  "Y88b          888             888                                   ');
    console.log('888    888          888             888                                   ');
    console.log('888    888  8888b.  888888  8888b.  88888b.   8888b.  .d8888b   .d88b.    ');
    console.log('888    888     "88b 888        "88b 888 "88b     "88b 88K      d8P  Y8b   ');
    console.log('888    888 .d888888 888    .d888888 888  888 .d888888 "Y8888b. 88888888   ');
    console.log('888  .d88P 888  888 Y88b.  888  888 888 d88P 888  888      X88 Y8b.       ');
    console.log('8888888P"  "Y888888  "Y888 "Y888888 88888P"  "Y888888  88888P"  "Y8888    ');
};