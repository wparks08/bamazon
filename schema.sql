DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE product(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255),
    department_id INT,
    price INT DEFAULT 0,
    stock_quantity INT,
    product_sales INT DEFAULT 0,
    PRIMARY KEY (item_id),
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE department(
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(63),
    over_head_costs INT DEFAULT 0,
    PRIMARY KEY (department_id)
);