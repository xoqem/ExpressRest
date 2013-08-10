var express = require('express'),
	path = require('path'),
	addresses = require('./routes/addresses');

var app = express();

// log requests for debugging purposes
app.use(express.logger('dev'));

// allow access to req.body
app.use(express.bodyParser());

// set the path to the client side code
app.use(express.static(path.join(__dirname, '../client')));

// create the routes
app.get('/addresses', addresses.findAll);
app.get('/addresses/:id', addresses.findById);
app.post('/addresses', addresses.addAddress);
app.put('/addresses/:id', addresses.updateAddress);
app.delete('/addresses/:id', addresses.deleteAddress);

// set the port and begin listening
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
