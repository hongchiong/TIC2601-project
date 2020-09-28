var express = require('express');
var db = require('./db.js');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users;', (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: 'Users retrieved successfully.',
    });
  });
});

var server = app.listen(8081, function () {
  var port = server.address().port;

  console.log(`Example app listening at http://localhost:${port}`);
});
