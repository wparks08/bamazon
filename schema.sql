DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE product(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255),
    department_name VARCHAR(63),
    price INT DEFAULT 0,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);