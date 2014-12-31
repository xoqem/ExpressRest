var mongo = require('mongodb');

var COLLECTION_NAME = 'addresses';

/**
 * The credentials to login to our mongo db.  In this case, we've created
 * a specific user and password for this app, and we can delete that user
 * easily, so having the username / password in the server side code should
 * be ok.  We could potentially move this out to a config to make it slightly
 * easier to find and edit.
 */
var DB_USER_NAME = 'username'; // TODO: insert user name
var DB_PASSWORD = 'pasword'; // TODO: insert password

/**
 * Construct the URI for our mongo database.  We could potentially move this
 * out to a config to make it slightly easier to find and edit.
 */
var mongoURI = [
  'mongodb://',
  DB_USER_NAME,
  ':',
  DB_PASSWORD,
  '@########.mongolab.com:#####/heroku_app########' // TODO: insert correct URL, should be in a similar format
].join('');

/**
 * Sends an error message as a response, and also log it to the console.
 * @param res - Express response object
 * @param err - Express error object
 * @param errorMessage
 */
var sendErrorResponse = function(res, err, errorMessage) {
  errorMessage = [errorMessage, err].join(' ');
  console.log(errorMessage);
  res.send({
    'error': errorMessage
  });
};

/**
 * Convenience method to return the object id expected by mongo.
 * @param id
 * @returns {Object} the object id expected by mongo
 */
var getObjectId = function(id) {
  return new mongo.BSONPure.ObjectID(id);
};

var collection;
mongo.Db.connect(mongoURI, function (err, db) {
  if (err) {
    console.log(['Error connecting to mongo db.', err].join(' '));
  } else {
    console.log('Connected to mongo db.');
    collection = db.collection(COLLECTION_NAME);
  }
});

/**
 * Route for finding an address by id.  Expects req.params.id to be set.
 * @param req
 * @param res
 */
exports.findById = function(req, res) {
  var id = req.params.id;
  console.log(['Finding address by id:', id].join(' '));

  collection.findOne({
    '_id': getObjectId(id)
  }, function (err, item) {
    if (err) {
      sendErrorResponse(res, err, ['Error finding address:', id].join(' '));
    } else {
      console.log(['Found address:', item].join(' '));
      res.send(item);
    }
  });
};

/**
 * Route for getting all addresses.
 * @param req
 * @param res
 */
exports.findAll = function(req, res) {
  console.log('Getting all addresses');

  collection.find().toArray(function(err, items) {
    if (err) {
      sendErrorResponse(res, err, 'Error getting addresses.');
    } else {
      console.log(['Found addresses:', items].join(' '));
      res.send(items);
    }
  });
};

/**
 * Route for adding an address.
 * @param req
 * @param res
 */
exports.addAddress = function(req, res) {
  var address = req.body;
  console.log(['Adding address:', address].join(' '));

  collection.insert(address, {
    safe: true
  }, function(err, items) {
    if (err) {
      sendErrorResponse(res, err, 'Error adding address.');
    } else {
      console.log(['Success:', items[0]].join(' '));
      res.send(items[0]);
    }
  });
};

/**
 * Route for updating an address by id.  Expects req.params.id to be set.
 * @param req
 * @param res
 */
exports.updateAddress = function(req, res) {
  var id = req.params.id;
  var address = req.body;
  console.log(['Updating address:', id].join(' '));

  delete address._id;

  collection.update({
    '_id': getObjectId(id)
  }, address, {
    safe: true
  }, function(err, result) {
    if (err) {
      sendErrorResponse(res, err, ['Error updating address:', id].join(' '));
    } else {
      console.log('Address updated.');
      res.send(address);
    }
  });
};

/**
 * Route for deleting an address by id.  Expects req.params.id to be set.
 * @param req
 * @param res
 */
exports.deleteAddress = function(req, res) {
  var id = req.params.id;
  console.log(['Deleteing address:', id].join(' '));

  collection.remove({
    '_id': getObjectId(id)
  }, {
    safe: true
  }, function (err, result) {
    if (err) {
      sendErrorResponse(res, err, 'Error removing address');
    } else {
      console.log(['Address deleted:', id].join(' '));
      res.send(req.body);
    }
  });
};
