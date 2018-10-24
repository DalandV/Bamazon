DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(100) NOT NULL,
 department_name VARCHAR(100),
 price DECIMAL(10, 2) NOT NULL,
 stock_quantity INT UNSIGNED NOT NULL,
 PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Camera", "Electronics", 56.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Childrens Book", "Books", 7.83, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing", 59.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Printer", "Office Electronics", 49.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Video Game", "Electronics", 59.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lamp", "Home & Kitchen", 56.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smart TV", "Electronics", 379.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 544.94, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smart Phone", "Electronics", 499.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "Pet Supplies", 18.99, 100);

SELECT * FROM products