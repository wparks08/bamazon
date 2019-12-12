var connection = require("./connection");
var Product = require("../Product");
var tables = require("../tables");

function list(arr, callback) {
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

function update(values, conditions) {

}

module.exports = {
    list: list,
    update: update
}