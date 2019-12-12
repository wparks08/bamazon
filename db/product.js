var connection = require("./connection");
var Product = require("../Product");
var tables = require("../tables");

function list(callback, arr = []) {
    connection.query(
        "SELECT * FROM product",
        (err, result) => {
            if (err) throw err;

            result.forEach(product => {
                arr.push(new Product(product));
            });

            tables.productTable.print(arr);
            callback();
        }
    )
}

function findWhere(condition, callback) {
    connection.query(
        "SELECT * FROM product WHERE " + connection.escape(condition),
        (err, result) => {
            if (err) {
                throw err;
            }

            let arr = [];

            result.forEach(product => {
                arr.push(new Product(product));
            });

            tables.productTable.print(arr);
            callback();
        }
    )
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