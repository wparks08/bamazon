require('dotenv').config();

const connection = require("./db");
const inquirer = require("inquirer");
const tables = require("./tables");

const Product = require("./Product");

function promptManagerMenu() {
    inquirer.prompt([
        {
            type: "list",
            choices: [
                { name: "View Products for Sale", value: "forSale", short: "View Products for Sale"},
                { name: "View Low Inventory", value: "lowInventory", short: "View Low Inventory"},
                { name: "Add to Inventory", value: "addInventory", short: "Add to Inventory"},
                { name: "Add New Product", value: "newProduct", short: "Add New Product"}
            ],
            name: "selection"
        }
    ]).then(menu => {
        switch (menu.selection) {
            case "forSale":
                console.log("forSale");
                break;
            case "lowInventory":
                console.log("lowInventory");
                break;
            case "addInventory":
                console.log("addInventory");
                break;
            case "newProduct":
                console.log("newProduct");
                break;
        }
    })
}

promptManagerMenu();