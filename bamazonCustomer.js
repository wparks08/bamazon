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
            
            printProductTable();
            promptPurchase();
        }
    )
}

function printProductTable() {
    let productTable = new Table({
        head: ["ID", "Product Name", "Department", "Price", "Qty"]
    });

    products.forEach(product => {
        productTable.push(
            [
                product.item_id,
                product.product_name,
                product.department_name,
                product.getPrice(),
                product.stock_quantity
            ]
        );
    });

    console.log(productTable.toString());
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

function validateIDInput(input) {
    let result = "Invalid ID";
    products.forEach(product => {
        if (product.item_id == input) {
            result = true;
            selectedProduct = product;
        }
    });
    return result;
}

function fulfillOrder(product, qty) {
    product.reduceQuantity(qty);

    updateProduct(
        { stock_quantity: product.stock_quantity },
        { item_id: product.item_id }
    );

    printReceipt(product, qty);
    console.log("Thank you for choosing Bamazon!");
    connection.end();
}

function updateProduct(values, condition) {
    connection.query(
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

function printReceipt(product, qty) {
    let total = product.getPrice() * qty;
    let receipt = new Table();
    receipt.push(
        { "Item": product.product_name },
        { "Price": "$ " + product.getPrice() },
        { "Quantity": qty },
        { "Total": "$ " + total }
    );

    console.log(receipt.toString());
}

displayItems();