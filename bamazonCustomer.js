require('dotenv').config();

const db = require("./db");
const inquirer = require("inquirer");
const tables = require("./tables");

var products = [];
//Display items for sale
function displayItems() {
    db.product.list(promptPurchase, products);
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
    product.adjustProductSales(qty * product.getPrice());

    db.product.update(
        { stock_quantity: product.stock_quantity, product_sales: product.product_sales },
        { item_id: product.item_id }
    );

    tables.receipt.print(product, qty);
    console.log("Thank you for choosing Bamazon!");
    db.connection.end();
}

displayItems();