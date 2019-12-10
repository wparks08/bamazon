var Table = require("cli-table");

function print(products) {
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

module.exports = {
    print: print
}