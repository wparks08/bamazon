function Product(values) {
    this.item_id = values.item_id;
    this.product_name = values.product_name;
    this.department_name = values.department_name;
    this.price = values.price;
    this.stock_quantity = values.stock_quantity;
}

//fn: reduce quantity
Product.prototype.reduceQuantity = function (reduceBy) {
    this.stock_quantity -= reduceBy;
}
//fn: get price
Product.prototype.getPrice = function () {
    return (this.price / 100).toFixed(2);
}

module.exports = Product;