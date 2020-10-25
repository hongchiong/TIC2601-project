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
  db.query(`SELECT id, email, address, name, admin FROM users WHERE users.id=${req.params.userId};`, (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: 'Users retrieved successfully.',
    });
  });
});

//Get all items by this user
app.get('/items/me/:userId', (req, res) => {
  db.query(`SELECT * FROM items WHERE items.user_id = ${req.params.userId};`, (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: 'Items retrieved successfully.',
    });
  });
});

//Get all likes by user
app.get('/likes/me/:userId', (req, res) => {
  db.query(`SELECT items.name, like_items.item_id, like_items.user_id, items.description, items.category_id, items.price, items.quantity FROM like_items INNER JOIN items ON items.id = like_items.item_id WHERE like_items.user_id = ${req.params.userId};`, (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: 'Likes retrieved successfully.',
    });
  });
});

//Get all comments SENT by user
app.get('/comments/me/:userId', (req, res) => {
  db.query(`SELECT users.name, users.email, users.address, comments.id, sender_id, receiver_id, comment FROM comments INNER JOIN users ON users.id = comments.receiver_id WHERE comments.sender_id = ${req.params.userId};`, (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: 'Comments retrieved successfully.',
    });
  });
});

//Get all comments RECEIVED by user
app.get('/comments/users/:userId', (req, res) => {
  db.query(`SELECT users.name, users.email, users.address, comments.id, sender_id, receiver_id, comment FROM comments INNER JOIN users ON users.id = comments.sender_id WHERE comments.receiver_id = ${req.params.userId};`, (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: 'Comments retrieved successfully.',
    });
  });
});


//Comment on a user
app.post('/comment', (req, res) => {
  db.query(
    `INSERT INTO comments (sender_id, receiver_id, comment) VALUES (${req.body.sender_id}, ${req.body.receiver_id}, "${req.body.comment}");`,
    (err, data, fields) => {
      if (err) throw err;
      res.status(200).json({
        data,
        message: 'Comment posted successfully',
      });
    }
  );
});

//Get all order items by user
app.get('/orders/me/:userId', (req, res) => {
  db.query(`SELECT order_items.item_id, order_items.order_id, order_items.quantity, items.name, items.price, items.description FROM orders INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN items ON items.id = order_items.item_id WHERE orders.user_id = ${req.params.userId};`, (err, data, fields) => {
    if (err) throw err;


    db.query(`SELECT id FROM orders WHERE orders.user_id = ${req.params.userId};`, (err2, data2, fields) => {
      if (err2) throw err;
  

    
      res.json({
        status: 200,
        data,
        orderIds: data2,
        message: 'Orders retrieved successfully.',
      });
    });
  });
});

//Create order for user
app.post('/orders', (req, res) => {
  db.query(
    `INSERT INTO orders (user_id, status) VALUES ("${req.body.user_id}", "completed");`,
    (err, data, fields) => {
      if (err) throw err;

      for (let i = 0; i < req.body.items.length; i++) {
        db.query(
          `INSERT INTO order_items (order_id, item_id, quantity) VALUES ("${data.insertId}", "${req.body.items[i].id}", "${req.body.items[i].quantity}");`,
          (err2, data2, fields2) => {
            if (err2) throw err2;
          }
        );

        db.query(
          `UPDATE items SET quantity = quantity - ${req.body.items[i].quantity} WHERE items.id = "${req.body.items[i].id}"`,
          (err3, data3, fields3) => {
            if (err3) throw err3;
          }
        );
      }

      res.json({
        status: 200,
        data,
        message: 'Items retrieved successfully.',
      });
      
    }
  );
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

//delete all items from database
app.delete('/delete_all_items', (req, res) => {
  db.query(
    'DELETE FROM items;',
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'All items deleted successfully.',
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

app.get('/items/likes/:itemId/users/:userId', (req, res) => {
  db.query(
    `SELECT * FROM like_items WHERE like_items.item_id="${req.params.itemId}" AND like_items.user_id="${req.params.userId}";`,
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
    `INSERT INTO like_items (user_id, item_id) VALUES ("${req.body.user_id}", "${req.body.item_id}")`,
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Item liked successfully.',
      });
    }
  );
});

app.delete('/likes', (req, res) => {
  db.query(
    `DELETE FROM like_items WHERE like_items.user_id=${req.body.user_id} AND like_items.item_id=${req.body.item_id}`,
    (err, data, fields) => {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: 'Item Deleted successfully.',
      });
    }
  );
});


var server = app.listen(8081, function () {
  var port = server.address().port;

  console.log(`Example app listening at http://localhost:${port}`);
});