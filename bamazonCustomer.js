require('dotenv').config();

const db = require("./db");
const inquirer = require("inquirer");
const tables = require("./tables");

const Product = require("./Product");

var products = [];
//Display items for sale
function displayItems() {
    db.product.list(products, promptPurchase);
}

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

function fulfillOrder(product, qty) {
    product.reduceQuantity(qty);

    updateProduct(
        { stock_quantity: product.stock_quantity },
        { item_id: product.item_id }
    );

    tables.receipt.print(product, qty);
    console.log("Thank you for choosing Bamazon!");
    db.connection.end();
}

function updateProduct(values, condition) {
    db.connection.query(
        "UPDATE product SET ? WHERE ?",
        [
            values,
            condition
        ],
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )
}

displayItems();