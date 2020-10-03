var db = require('./db.js');
var faker = require('faker');

//add one admin account
db.query(
  `INSERT INTO users (email, password, name, address, admin) VALUES ("admin", "password123", "Admin", "National University of Singapore", true);`,
  (err, data, fields) => {
    if (err) throw err;
  }
);

// seed users
for (let i = 1; i < 15; i++) {
  db.query(
    `INSERT INTO users (email, password, name, address, admin) VALUES ("${faker.internet.email()}", "password123", "${faker.name.findName()}", "${faker.address.streetAddress()}", false);`,
    (err, data, fields) => {
      if (err) throw err;
    }
  );
};

//seed categories
["Food & Beverages", "Computers & Peripherals", "Health & Wellness", "Travel & Luggage", "Home Appliances", "Apparels", "Shoes", "Jewellery & Accessories", "Toys, Kids & Babies", "Video Games"].map((category) => {
  db.query(
    `INSERT INTO categories (category) VALUES ("${category}");`,
    (err, data, fields) => {
      if (err) throw err;
    }
  );
});

// seed some items
for (let i = 2; i < 14; i++) {
  db.query(
    `INSERT INTO items (user_id, name, price, quantity, category_id) VALUES ("${i}", "${faker.commerce.product()}", "${faker.commerce.price()}", ${faker.random.number(30) + 20}, ${faker.random.number(9) + 1});`,
    (err, data, fields) => {
      if (err) throw err;
    }
  );
};