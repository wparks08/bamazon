USE bamazon;

INSERT INTO department (department_name)
            VALUES ("Movies"),
                   ("Electronics"),
                   ("Pets"),
                   ("Automotive");

INSERT INTO product (product_name, department_id, price, stock_quantity)
            VALUES  ("The Departed", (SELECT department_id FROM department WHERE department_name="Movies"), 999, 324),
                    ("Inception", (SELECT department_id FROM department WHERE department_name="Movies"), 1499, 345),
                    ("PS4", (SELECT department_id FROM department WHERE department_name="Electronics"), 29999, 987),
                    ("Xbox One", (SELECT department_id FROM department WHERE department_name="Electronics"), 29999, 4567),
                    ("Dog Food", (SELECT department_id FROM department WHERE department_name="Pets"), 2499, 367),
                    ("Cat Food", (SELECT department_id FROM department WHERE department_name="Pets"), 2099, 482),
                    ("Dog Collar", (SELECT department_id FROM department WHERE department_name="Pets"), 699, 641),
                    ("Motor Oil", (SELECT department_id FROM department WHERE department_name="Automotive"), 499, 561),
                    ("Transmission Fluid", (SELECT department_id FROM department WHERE department_name="Automotive"), 699, 194),
                    ("Tire Pressure Gauge", (SELECT department_id FROM department WHERE department_name="Automotive"), 299, 65412);