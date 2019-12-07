function Product(values) {
    this.item_id = values.item_id;
    this.product_name = values.product_name;
    this.department_name = values.department_name;
    this.price = values.price;
    this.stock_quantity = values.stock_quantity;
}

Product.prototype.print = function () {
    console.log(""); //Print everything here
}

module.exports = Product;