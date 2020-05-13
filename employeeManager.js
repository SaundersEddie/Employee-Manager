// Employee Manager front end
// This reminds me of those old school green screen applications that gave you a headache and made your eyes
// bleed after 25 minutes of use...

// This app uses the following NPMpackages:
// mysql, inquirer, and console.table

// Eddie Saunders saunders.eddie@outlook.com 2md May2020
// EXS 7th May 2020 - Conversion to ES6 standards

// const mysql = require("mysql");
const inquirer = require("inquirer");

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
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    start();
});

// EXS 5th May 2020 - Build our functions out

// Initial start function. Diosplay the logo then display get first user input
function start() {
    displayLogo();
    getUserInput();
}

// EXS 2nd May 2020 - This only needs to be a simple function as we're using the reponse locally, and call out functions from within
// the switch statement
// Some of the commands could have been done in place of the switch statement, however in the name of clarify rather than performance they
// were left as functions, one only wants bleedng eyes from using the app, not following the code.

async function getUserInput() {
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
            "View All Employees by Department",
            "View All Employees by Manager",
            "Whack Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Leave This Application"
        ]
    })
        .then(function (answer) {
            // EXS 7th May 2020
            // Call a function which will work through the selections to route our request
            console.log(answer.userSelection);
            routeUserSelection(answer.userSelection);
        })
}
// EXS 6th May 2020 - Route to our users choice
const routeUserSelection = async (myChoice) => {
    // async function routeUserSelection(myChoice) {
    switch (myChoice) {
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
        case ("View All Employees by Manager"):
            viewAllEmployeesByManager();
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
            console.log("Toodle pip!");
            connection.end();
            break;
        default:
            console.log("An Error Occurred");
            connection.end();
    };
};

async function executeSQLQuery(myQuery) {
    //console.log ("Execute thisQuery", myQuery);
    connection.query(myQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        //console.log ("This should be the result in executeSQL query: ", res);
        return res;
    });
};

const viewAllEmployees = async () => {
    // EXS 2nd May 2020 - Display all employees then return
    connection.query(`SELECT * from employee`, (err, res) => {
        //connection.query('SELECT * FROM employee INNER JOIN user_role ON role_id = user_role.id INNER JOIN department ON department.id = user_role.department_id', (err, res) => {
        if (err) throw err;
        console.table(res);
        getUserInput();
    });
};

const viewAllDepartments = async () => {
    connection.query(`SELECT * from department`, (err, res) => {
        if (err) throw err;
        console.table(res);
        getUserInput();
    });
};

const viewAllRoles = async () => {
    connection.query(`SELECT * from role`, (err, res) => {
        if (err) throw err;
        console.table(res);
        getUserInput();
    });
};

const addNewEmployee = async () => {
    //read the employees first
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        //Get New Employee Info
        return inquirer.prompt([
            {
                type: "input",
                name: "first",
                message: "Employee's first name?"
            },

            {
                type: "input",
                name: "last",
                message: "Employee's surname?"
            },

            {
                type: "list",
                name: "role",
                message: "What is the Employee's role?",
                choices: function () {
                    choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].title)
                    }
                    return choiceArray
                }
            },
            {
                type: "list",
                name: "manager",
                message: "What is the manager's ID?",
                choices: [
                    1, 2, 3
                ]
            }
        ])
            //input the answers
            .then(answer => {

                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.first,
                        last_name: answer.last,
                        role_id: answer.role,
                        manager_id: answer.manager
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("added successfully");
                        getUserInput();
                    }
                )
            })
    })
};

const addNewDepartment = async () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "newDepartmentName",
            message: "What is the new department name? "
        }
    ])
        .then(answer => {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    dept_name: answer.newDepartmentName,
                },
                function (err) {
                    if (err) throw err;
                    console.log("added successfully");
                    getUserInput();
                }
            )
        })
};

const addNewRole = async () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "newRoleName",
            message: "What is the new role name? "
        },{
            type: "input",
            name: "newRoleSalary",
            message: "What is the new role salary?"
        }

    ])
        .then(answer => {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.newRoleName,
                    salary: answer.newRoleSalary
                },
                function (err) {
                    if (err) throw err;
                    console.log("added successfully");
                    getUserInput();
                }
            )
        })
};

const viewAllEmployeesByDepartment = async () => {
    connection.query("SELECT * FROM employee", (err, res) => { if (err) throw err; console.table(res); getUserInput(); });
    getUserInput();
};


const viewAllEmployeesByManager = async () => {
    console.log("View all by Manager");
    getUserInput();
};



const deleteEmployee = async () => {
    // Display all our employees to select from
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        //ask which employee they want to remove
        let myResults = res.Map;
        console.log("myResults:", myResults);
        inquirer.prompt([
            {
                type: "list",
                name: "name",
                message: "Who would you like to whack?",
                choices: () => {
                    const choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + " " + res[i].last_name);
                    }
                    return choiceArray;
                },
            }
        ])
            .then((answer) => {
                let fullName = answer.name;
                console.log("Full Name: ", fullName);
                // The challenge here will be users with names like Rip Van Winkle, While it will display Rip Van Winkle, the remove will
                // only use Rip Van due to the way the split is setup.
                let remove = fullName.split(" ");
                console.log(remove);

                connection.query(`DELETE FROM employee WHERE first_name = "${remove[0]}" AND last_name = "${remove[1]}"`, function (err) {
                    if (err) throw err;
                    console.log("removed successfully");
                    // re-prompt
                    getUserInput();
                }
                )
            })
    })
};

const updateEmployeeRole = async () => {
    //pull all the employees first
    connection.query("SELECT * FROM employeeInfo", function (err, res) {
        if (err) throw err

        //ask who they want to modify
        inquirer.prompt([
            {
                type: "list",
                name: "name",
                message: "Which employee would you like to update the role of?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + " " + res[i].last_name);
                    }
                    return choiceArray;
                }
            },

            {
                type: "list",
                name: "role",
                message: "What would you like to update the role to be?",
                choices: function () {
                    var choiceArray = ["Add Role"];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].title);
                    }
                    return choiceArray;
                }
            }
        ])
            // now modify them
            .then(function (answer) {
                //split the name
                let fullName = answer.name;
                console.log(fullName);
                let splitName = fullName.split(" ");
                console.log(splitName[0]);

                if (answer.role === "Add Role") {
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "newRole",
                            message: "What is the new role?"
                        }
                    ])
                        .then(function (result) {
                            connection.query(
                                `UPDATE employeeInfo SET title = "${result.newRole}" WHERE first_name = "${splitName[0]}" AND last_name = "${splitName[1]}"`,
                                // [ {title: result.newRole}  ]   
                                function (err) {
                                    if (err) throw err;
                                    console.log("added successfully");
                                    // re-prompt
                                    initial();
                                }
                            )
                        })
                }
                else {
                    connection.query(
                        `UPDATE employeeInfo SET title = "${answer.role}" WHERE first_name = "${splitName[0]}" and last_name = "${splitName[1]}"`,
                        // [ {title: answer.role}     ]
                        function (err) {
                            if (err) throw err;
                            console.log("added successfully");
                            // re-prompt
                            initial();
                        }
                    )
                }
            })
    })
};

const updateEmployeeManager = async () => {
    //pull all the employees first
    connection.query("SELECT * FROM employeeInfo", function (err, res) {
        if (err) throw err

        //ask who they want to modify
        inquirer.prompt([
            {
                type: "list",
                name: "name",
                message: "Which employee would you like to update the manager of?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + " " + res[i].last_name);
                    }
                    return choiceArray;
                }
            },

            {
                type: "list",
                name: "manager",
                message: "Who would you like to update the manager to be?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].manager);
                    }
                    return choiceArray;
                }
            }
        ])
            // now modify them
            .then(function (answer) {
                //split the name
                let fullName = answer.name;
                console.log(fullName);
                let splitName = fullName.split(" ");
                console.log(splitName[0]);

                connection.query(
                    `UPDATE employeeInfo SET manager = "${answer.manager}" WHERE first_name = "${splitName[0]}" and last_name = "${splitName[1]}"`,

                    function (err) {
                        if (err) throw err;
                        console.log("updated successfully");
                        // re-prompt
                        initial();
                    }
                )
            })
    })
};

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
};

