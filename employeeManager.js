// Employee Manager front end
// 
// Eddie Saunders saunders.eddie@outlook.com 2md May2020
//


const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "WestHam666!!",
    database: "employee_db"
});

connection.connect (function(error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId);
});