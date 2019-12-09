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
            promptPurchase();
        }
    )
}

displayItems();
//Prompt user:
//-Ask ID of product to buy
//-Ask how many units of product
function promptPurchase() {
    let selectedProduct;
    inquirer.prompt([
        {
            type: "number",
            message: "Enter ID of item: ",
            name: "id",
            validate: function (input) {
                let result = "Invalid ID";
                products.forEach(product => {
                    if (product.item_id == input) {
                        result = true;
                        selectedProduct = product;
                    }
                });
                return result;
            }
        },
        {
            type: "number",
            message: "Enter quantity to buy: ",
            name: "qty",
            validate: function (input) {
                let result = "Insufficient Quantity";
                if (input < selectedProduct.stock_quantity) {
                    result = true;
                }
                return result;
            }
        }
    ]).then(answers => {
        fulfillOrder(selectedProduct, answers.qty);
    })
}
//Check if sufficient inventory
//-If no, log a message and prevent order
//-If yes, "fulfill" order
//--Update db with new quantity
//--Show customer total cost of purchase
function fulfillOrder(product, qty) {
    let total = product.price * qty / 100;
    let receipt = new Table();
    receipt.push(
        { "Item" : product.product_name },
        { "Price" : "$ " + product.price / 100 },
        { "Quantity" : qty },
        { "Total" : "$ " + total }
    );

    connection.query(
        "UPDATE product SET ? WHERE ?",
        [
            { stock_quantity: product.stock_quantity - qty },
            { item_id: product.item_id }
        ],
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )

    console.log(receipt.toString());
    console.log("Thank you for choosing Bamazon!");
    connection.end();
}