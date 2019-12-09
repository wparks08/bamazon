require('dotenv').config();

const connection = require("./db");
const inquirer = require("inquirer");

const Product = require("./Product");

var products = [];
//Display items for sale
function displayItems() {
    connection.query(
        "SELECT * FROM product",
        (err, result) => {
            if (err) throw err;

            result.forEach(product => {
                products.push(new Product(product));
            });
            
        }
    )
}

displayItems();
//Prompt user:
//-Ask ID of product to buy
//-Ask how many units of product

//Check if sufficient inventory
//-If no, log a message and prevent order
//-If yes, "fulfill" order
//--Update db with new quantity
//--Show customer total cost of purchase
