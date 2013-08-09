var express = require('express'),
	path = require('path'),
	http = require('http'),
	routes = require('./routes/addresses');

var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.use(express.logger('dev'));
	app.use(express.bodyParser()),
	app.use(express.static(path.join(___dirname, 'public')))
});

app.get('/addresses', addresses.findAll);
app.get('/addresses/:id', addresses.findById);
app.post('/addresses', addresses.addAddress);
app.put('/addresses/:id', addresses.updateAddress);
app.delete('/addresses/:id', addresses.deleteAddress);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});