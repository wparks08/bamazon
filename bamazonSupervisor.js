require("dotenv").config();

const db = require("./db");
const inquirer = require("inquirer");
//Initial prompt for supervisor functions
function promptSupervisorMenu() {
    inquirer.prompt([
        {
            type: "list",
            choices: [
                { name: "View Product Sales By Department", value: "productSales", short: "View Product Sales By Department" },
                { name: "Create New Department", value: "newDepartment", short: "Create New Department" },
                { name: "Exit", value: "exit", short: "Exit" }
            ],
            name: "selection"
        }
    ]).then(menu => {
        switch (menu.selection) {
            case "productSales":
                db.department.listDepartmentSales(promptSupervisorMenu);
                break;
            case "newDepartment":
                promptNewDepartment();
                break;
            case "exit":
                db.connection.end();
        }
    });
}
//Begin add new department process
function promptNewDepartment() {
    inquirer.prompt([
        {
            message: "Enter Department Name: ",
            name: "department_name"
        },
        {
            type: "number",
            message: "Enter Overhead Costs",
            name: "over_head_costs"
        }
    ]).then(department => {
        db.department.save(department, promptSupervisorMenu);
    })
}

promptSupervisorMenu();