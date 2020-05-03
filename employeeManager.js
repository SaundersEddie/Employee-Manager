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
    displayLogo();
    getUserInput();
}

function getUserInput() {
// EXS - get our user input, made this a callable function as the user needs to return here after they perform the selection
    inquirer
        .prompt(
            {
                name: "userSelection",
                type: "list",
                message: "What would you like to do today?",
                choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Whack Employee", "Update Employee Role", "Update Employee Manager", "Leave This Application"]
            })
        .then(function (answer) {
            // console.log("Your selection was: ", answer);
            // console.log (answer.userSelection);
            switch (answer.userSelection) {
                case ("View All Employees"):
                    viewAllEmployees();
                    //console.log("Viewing all employees");
                    break;
                case ("View All Employees by Department"):
                    viewAllEmployeesByDepartment();
                    break;
                case ("View All Employees by Manager"):
                    viewAllEmployeesByManager();
                    break;
                case ("Add Employee"):
                    addEmployee();
                    break;
                case ("Whack Employee"):
                    deleteEmployee();
                    break;
                case ("Update Employee Role"):
                    updateEmployeeRole();
                    break;
                case ("Update Employee Manager"):
                    updateEmployeeManager();
                    break;
                case ("Leave This Application"):
                    console.log("Leaving Application");
                    connection.end();
                    break;
                default:
                    console.log("An Error Occurred");
                    // console.log("You selected ", answer);
                    connection.end();
            };
        });
}

function viewAllEmployees() {
    // EXS 2nd May 2020 - Display all employees then return
    console.log ("View all employees baby!")
 
    // EXS 2nd May 2020 once we're done with viewing all return to the main menu  
    getUserInput();
}

function viewAllEmployeesByDepartment() {
    console.log ("View all by Dept")
    getUserInput();
}

function viewAllEmployeesByManager () {
    console.log ("View all by Manager");
    getUserInput();
}

function addEmployee() {
    console.log ("Adding Employee Baby");
    getUserInput();
}

function deleteEmployee() {
    console.log ("Whack it baby!");
    getUserInput();
}

function updateEmployeeRole() {
    console.log ("Updating employee Role");
    getUserInput();
}

function updateEmployeeManager() {
    console.log ("Update Employee Manager");
    getUserInput();
}


function displayLogo() {
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
                                                                              

}
