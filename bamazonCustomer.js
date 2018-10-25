var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  availableItems();
  userPrompts();
});

// When the app starts display all of the items available for sale.
// Include the ids, names, and prices of products for sale.
function availableItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.log("\nHere are all of our available products:\n")

    res.forEach(function (element) {
      console.log(
        "Product ID: " + element.item_id + "\n" +
        "Product: " + element.product_name + "\n" +
        "Price: $" + element.price + "\n"
      );
    });
  });
};

// Prompt users with two messages
function userPrompts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "id_input",
          type: "input",
          message: "Please enter the ID number of the product you would like to purchase",
          validate: function (value) {
            if (value <= res.length && value > 0 && isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "units_input",
          type: "input",
          message: "How many units of the product would you like to buy",
          validate: function (value) {
            if (value > 0 && isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ]).then(function (answer) {
        var productID = answer.id_input
        var desiredUnits = answer.units_input
        var unitsInStock = res[productID - 1].stock_quantity
        var price = res[productID - 1].price
        var totalPrice = price * desiredUnits

        // Check if the item is in stock
        if (desiredUnits <= unitsInStock) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: unitsInStock - desiredUnits
              },
              {
                item_id: productID
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("\nYour order is being processed!" +
                "\nThank you for shopping at Bamazon!" +
                "\nYour total comes to: $" + round(totalPrice, 2) +
                "\n");
              connection.end();
            }
          );
        }
        else if (desiredUnits > unitsInStock && unitsInStock !== 0) {
          console.log("\nSorry, we only have " + unitsInStock + " items in stock at the moment.\n");
          connection.end();
        }
        else if (unitsInStock === 0) {
          console.log("\nSorry, looks like that item is out of stock\n")
          connection.end();
        }
      });
  });
};

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};
