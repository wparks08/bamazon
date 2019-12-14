require('dotenv').config();

const db = require("./db");
const inquirer = require("inquirer");

function promptManagerMenu() {
    inquirer.prompt([
        {
            type: "list",
            choices: [
                { name: "View Products for Sale", value: "forSale", short: "View Products for Sale"},
                { name: "View Low Inventory", value: "lowInventory", short: "View Low Inventory"},
                { name: "Add to Inventory", value: "addInventory", short: "Add to Inventory"},
                { name: "Add New Product", value: "newProduct", short: "Add New Product"},
                { name: "Exit", value: "exit", short: "Exit"}
            ],
            name: "selection"
        }
    ]).then(menu => {
        switch (menu.selection) {
            case "forSale":
                db.product.list(promptManagerMenu);
                break;
            case "lowInventory":
                db.product.findWhere("stock_quantity < 5", promptManagerMenu);
                break;
            case "addInventory":
                let products = [];

                db.product.list(
                    function () {
                        addInventory(products);
                    },
                    products
                );
                break;
            case "newProduct":
                addNewProduct();
                break;
            case "exit":
                db.connection.end();
        }
    })
}

function addInventory(products) {
    let selectedProduct;
    inquirer.prompt([
        {
            type: "number",
            message: "Enter ID of Item: ",
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
            message: "How many new units? ",
            name: "newUnits"
        }
    ]).then(answers => {
        db.product.update(
            { stock_quantity: selectedProduct.stock_quantity + answers.newUnits },
            { item_id: selectedProduct.item_id }
        );
        promptManagerMenu();
    })
}

function addNewProduct() {
    db.department.getAll().then(departments => {
        let departmentChoices = [];
        departments.forEach(department => {
            departmentChoices.push({
                name: department.department_name,
                value: department.department_id,
                short: department.department_name
            });
        })
        inquirer.prompt([
            {
              message: "Enter Product Name: ",
              name: "product_name"
            },
            {
              type: "list",
              choices: departmentChoices,
              message: "Select Department: ",
              name: "department_id"
            },
            {
              type: "number",
              message: "Enter Price: ",
              name: "price"
            },
            {
              type: "number",
              message: "Enter current stock: ",
              name: "stock_quantity"
            }
          ])
          .then(product => {
            if (product.price % 1) {
              product.price = product.price
                .toString()
                .split(".")
                .join(""); //price is stored as cents
            }

            db.product.save(product);
            promptManagerMenu();
          });
    });
}

promptManagerMenu();