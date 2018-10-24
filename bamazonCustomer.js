var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  availableItems();
  userPrompts();
  connection.end();
});

// When the app starts display all of the items available for sale.
// Include the ids, names, and prices of products for sale.

function availableItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.log("\n" + "Here are all of our available products:" + "\n")

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
// Please enter the ID of the product you would like to buy.
// How many units of the product would you like to buy?
function userPrompts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "id_input",
        type: "input",
        message: "Please enter the ID number of the product you would like to purchase"
      },
      {
        name: "units_input",
        type: "input",
        message: "How many units of the product would you like to buy"
      }
    ]).then(function(answer){
      console.log(answer.id_input);
      console.log(answer.units_input);
    });
  });
};
