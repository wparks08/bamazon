const mysql = require("mysql");

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "bamazon"
});
connection.connect(err => {
     if (err) throw err;
    });

module.exports = connection;