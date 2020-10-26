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

// allow user to post item for sell
app.post('/postItems', (req, res) => {
  db.query(
    `INSERT INTO items (name,price,quantity,description) VALUES ("${req.body.name}", "${req.body.price}", "${req.body.quantity}", "${req.body.description}")`,
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Posted item successfully.',
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
    `INSERT INTO like_items (user_id, item_id) VALUES ("${req.body.user_id}", "${req.body.item_id}")`,
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Liked Items retrieved successfully.',
      });
    }
  );
});

app.post('/orderItems', (req, res) => {
  db.query(
    `INSERT INTO order_items (order_id, item_id, quantity) VALUES ("${req.body.order_id}", "${req.body.item_id}", "${req.body.order_items.quantity}")`,
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Ordered Items retrieved successfully.',
      });
    }
  );
});



app.put('/checkout', (req, res) => {
  db.query(
    `UPDATE items SET quantity = quantity - "${req.body.order_items.quantity}" WHERE EXISTS (SELECT * FROM order_items WHERE items.id = order_items.item_id);`,
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Checkout retrieved successfully.',
      });
    }
  );
});

app.get('/searchBar', (req, res) => {
  db.query(
    `SELECT * FROM items WHERE EXISTS (SELECT * FROM categories WHERE items.category_id = categories.id AND categories.category = ${req.params.categories.category})`,
    (err, data, fields) => {
      if (err) throw err;
    });
      
  db.query(
      `SELECT * FROM items WHERE items.name = ${req.params.items.name}`,
      (err, data, fields) => {
        if (err) throw err;    
      });

      res.json({
        status: 200,
        data,
        message: 'Search Bar retrieved successfully.',
      });
});

app.post('/createAdminUser', (req, res) => {
  db.query(
    `INSERT INTO users (id, email, password, name, address, admin) VALUES ("${req.body.id}", "${req.body.email}", "${req.body.password}", "${req.body.name}", "${req.body.address}", "${req.body.admin}")`,
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Function of create new user only applicable to admin.',
      });
    }
  );
});


var server = app.listen(8081, function () {
  var port = server.address().port;

  console.log(`Example app listening at http://localhost:${port}`);
});