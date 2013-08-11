var mongo = require('mongodb');

var COLLECTION_NAME = 'addresses';

/**
 * The credentials to login to our mongo db.  In this case, we've created
 * a specific user and password for this app, and we can delete that user
 * easily, so having the username / password in the server side code should
 * be ok.  We could potentially move this out to a config to make it slightly
 * easier to find and edit.
 */
var DB_USER_NAME = 'app';
var DB_PASSWORD = 'test123';

/**
 * Construct the URI for our mongo database.  We could potentially move this
 * out to a config to make it slightly easier to find and edit.
 */
var mongoURI = [
  'mongodb://',
  DB_USER_NAME,
  ':',
  DB_PASSWORD,
  '@ds037758.mongolab.com:37758/heroku_app17400147'
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

var addDataIfEmpty = function() {
  db.collection(COLLECTION_NAME, {
    safe: true
  }, function(err, collection) {
    if (err) {
      console.log([
        'Collection', COLLECTION_NAME, 'does not exists.',
        'Populating it with a fake address'
      ].join(' '));
      db.collection(COLLECTION_NAME, function(err, collection) {

        var items = [{
          name: 'John Doe',
          address1: '123 1st Ave',
          address2: 'Apt 4',
          city: 'Seattle',
          state: 'WA',
          zip: '98101',
          phone: '1234567890'
        }];

        collection.insert(items, {
          safe:true
        }, function(err, result) {
          // do nothing
        });
      });
    }
  });
}

var db;
mongo.Db.connect(mongoURI, function (err, database) {
  if (err) {
    console.log('Error connecting to mongo db.'[err].join(' '));
  } else {
    console.log('Connected to mongo db.');
    db = database;
    addDataIfEmpty();
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

  db.collection(COLLECTION_NAME, function(err, collection) {
    collection.findOne({
      '_id': new mongo.BSONPure.ObjectID(id)
    }, function (err, item) {
      if (err) {
        sendErrorResponse(res, err, ['Error finding address:', id].join(' '));
      } else {
        console.log(['Found address:', item].join(' '));
        res.send(item);
      }
    });
  });
};

/**
 * Route for getting all addresses.
 * @param req
 * @param res
 */
exports.findAll = function(req, res) {
  console.log('Getting all addresses');

  db.collection(COLLECTION_NAME, function(err, collection) {
    collection.find().toArray(function(err, items) {
      if (err) {
        sendErrorResponse(res, err, 'Error getting addresses.');
      } else {
        console.log(['Found addresses:', items].join(' '));
        res.send(items);
      }
    });
  });
};

/**
 * Route for adding an address.
 * @param req
 * @param res
 */
exports.addAddress = function(req, res) {
  var address = req.body;
  console.log(['Adding address:', JSON.stringify(address)].join(' '));

  db.collection(COLLECTION_NAME, function(err, collection) {
    collection.insert(address, {
      safe: true
    }, function(err, result) {
      if (err) {
        sendErrorResponse(res, err, 'Error adding address.');
      } else {
        console.log(['Success:', JSON.stringify(result[0])].join(' '));
        res.send(result[0]);
      }
    });
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
  delete address._id;
  console.log(['Updating address:', id].join(' '));
  console.log(JSON.stringify(address));
  db.collection(COLLECTION_NAME, function(err, collection) {
    collection.update({
      '_id': new mongo.BSONPure.ObjectID(id)
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

  db.collection(COLLECTION_NAME, function(err, collection) {
    collection.remove({
      '_id': mongo.BSONPure.ObjectID(id)
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
  });
};
