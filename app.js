var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('You have reached the / route!');
});

app.listen(process.env.PORT || 4730);