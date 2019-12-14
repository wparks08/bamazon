//Constructor for use with product db table

function Product(values) {
    this.item_id = values.item_id;
    this.product_name = values.product_name;
    this.department_id = values.department_id;
    this.price = values.price;
    this.stock_quantity = values.stock_quantity;
    this.product_sales = values.product_sales;
}

//fn: reduce quantity
Product.prototype.reduceQuantity = function (reduceBy) {
    this.stock_quantity -= reduceBy;
}
//fn: get price
Product.prototype.getPrice = function () {
    return (this.price / 100).toFixed(2);
}

Product.prototype.adjustProductSales = function (amount) {
    this.product_sales += amount;
}

module.exports = Product;