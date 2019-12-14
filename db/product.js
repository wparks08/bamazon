var connection = require("./connection");
var department = require("./department");
var Product = require("../Product");
var tables = require("../tables");

function list(callback, arr = []) {
    department.getAll().then(departments => {
        connection.query("SELECT * FROM product", (err, result) => {
          if (err) {
              throw err;
          }

          result.forEach(product => {
                let newProduct = new Product(product);
                newProduct.department_name = departments.filter(dep => dep.department_id == newProduct.department_id)[0].department_name;
                arr.push(newProduct);
          });

          tables.productTable.print(arr);
          callback();
        });
    });
}

function findWhere(condition, callback) {
    department.getAll().then(departments => {
        connection.query(
          "SELECT * FROM product WHERE " + condition,
          (err, result) => {
            if (err) {
              throw err;
            }

            let arr = [];

            result.forEach(product => {
                let newProduct = new Product(product);
                newProduct.department_name = departments.filter(dep => dep.department_id == newProduct.department_id)[0].department_name;
                arr.push(newProduct);
            });

            tables.productTable.print(arr);
            callback();
          }
        );
    });
}

function update(values, condition) {
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

function save(values) {
    connection.query(
        "INSERT INTO product SET ?",
        values,
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )
}

module.exports = {
    list: list,
    findWhere: findWhere,
    update: update,
    save: save
}