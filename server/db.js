require('dotenv').config();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

connection.connect(function (err) {
  if (err) throw err;

  connection.query('SELECT * FROM users;', (err, result, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;

    // if there is no error, you have the result
    console.log(result);
  });
});

module.exports = connection;
