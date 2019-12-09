require('dotenv').config();

const connection = require("./db");
const inquirer = require("inquirer");
var Table = require("cli-table");

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
            
            let productTable = new Table({
                head: ["ID", "Product Name", "Department", "Price", "Qty"]
            });

            products.forEach(product => {
                productTable.push(
                    [
                        product.item_id,
                        product.product_name,
                        product.department_name,
                        product.price / 100,
                        product.stock_quantity
                    ]
                );
            });

            console.log(productTable.toString());
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
