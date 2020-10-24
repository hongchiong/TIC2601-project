var express = require('express');
var db = require('./db.js');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/users', (req, res) => {
  db.query('SELECT id, email, address, name, admin FROM users;', (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: 'Users retrieved successfully.',
    });
  });
});

app.get('/users/:userId', (req, res) => {
  db.query('SELECT id, email, address, name, admin FROM users;', (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: 'Users retrieved successfully.',
    });
  });
});

app.get('/items', (req, res) => {
  db.query(
    'SELECT items.id, user_id, items.name as itemName, price, quantity, email,  users.name as userName, address FROM items INNER JOIN users ON items.user_id = users.id ORDER BY items.name ASC;',
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Items retrieved successfully.',
      });
    }
  );
});


app.get('/items/:itemId', (req, res) => {
  db.query(
    `SELECT items.id, user_id, items.name as itemName, price, quantity, email,  users.name as userName, address FROM items INNER JOIN users ON items.user_id = users.id WHERE items.id="${req.params.itemId}";`,
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Item retrieved successfully.',
      });
    }
  );
});

app.get('/categories', (req, res) => {
  db.query(
    'SELECT * FROM categories;',
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Categories retrieved successfully.',
      });
    }
  );
});

app.post('/login', (req, res) => {
  db.query(
    `SELECT id, email, address, name, admin FROM users WHERE users.email="${req.body.email}" AND users.password="${req.body.password}";`,
    (err, data, fields) => {
      if (err) throw err;
      if (data.length === 0) {
        res.status(204).send('No such user found');
      } else {
        res.status(200).json({
          data,
          message: 'User logged in successfully',
        });
      }
    }
  );
});

app.post('/signup', (req, res) => {
  db.query(
    `INSERT INTO users (email, password, name, address, admin) VALUES ("${req.body.email}", "${req.body.password}", "${req.body.name}", "${req.body.address}", false);`,
    (err, data, fields) => {
      if (err) throw err;
      res.status(200).json({
        data,
        message: 'User signed up successfully',
      });
    }
  );
});

app.post('/likes', (req, res) => {
  db.query(
    `INSERT INTO like_items (user_id, user_id) VALUES ("${req.body.user_id}", "${req.body.user_id}")`,
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Items retrieved successfully.',
      });
    }
  );
});

app.get('/searchbyCategories', (req, res) => {
  db.query(
    'SELECT * FROM items WHERE EXISTS (SELECT * FROM users WHERE items.user_id = users.id) ORDER BY items.modifyTime DESC;',
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Items retrieved successfully.',
      });
    }
  );
});

var server = app.listen(8081, function () {
  var port = server.address().port;

  console.log(`Example app listening at http://localhost:${port}`);
});