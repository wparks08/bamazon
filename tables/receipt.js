var Table = require("cli-table");

function print(product, qty) {
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

module.exports = {
    print: print
}