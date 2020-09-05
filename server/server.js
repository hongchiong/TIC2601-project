var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Our web app');
});

app.get('/about', function (req, res) {
  res.send('Project group');
});

var server = app.listen(8081, function () {
  var port = server.address().port;

  console.log(`Example app listening at http://localhost:${port}`);
});