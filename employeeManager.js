// Employee Manager front end
// 
// Eddie Saunders saunders.eddie@outlook.com 2md May2020
//


const mysql = require("mysql");
const inquirer = require("inquirer");

// Build our connection string and connect to the database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "WestHam666!!",
    database: "employee_db"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId);
    start();
});

function displayLoginLogo() {
    console.log("Connecting to Employee Database");
    return;
}

function start() {
    displayLoginLogo();
    inquirer
        .prompt(
            {
                name: "userSelection",
                type: "list",
                message: "What would you like to do today?",
                choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Whack Employee", "Update Employee Role", "Update Employee Manager", "Leave This Application"]
            })
        .then(function (answer) {
            console.log("Your selection was: ", answer);
            switch (answer) {
                case ("View All Employees"):
                    console.log("Viewing all employees");
                    break;
                case ("View All Employees By Department"):
                    console.log("View all by Dept");
                    break;
                default:
                    console.log("An Error Occurred");
                    console.log("You selected ", answer);
                    connection.end();
            };
        });
}
