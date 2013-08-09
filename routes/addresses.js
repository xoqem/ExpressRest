var mongo = require('mongodb');

var Server = mongo.Server,
  Db = mongo.Db,
  BSON = mongo.BSONPure;

var DB_NAME = 'addressesdb';
var COLLECTION_NAME = 'addresses';

var server = new Server('localhost', 27017, {
  auto_reconnect: true
});
db = new Db(DB_NAME, server, {
  safe: true
});

db.open(function(err, db) {
  if (!err) {
    console.log(['Connected to', DB_NAME].join(' '));
    db.collection(COLLECTION_NAME, {
      safe: true
    }, function(err, collection) {
      if (err) {
        console.log([
          'Collection', COLLECTION_NAME, 'does not exists.',
          'Populating it with a fake address'
        ].join(' '));
        db.collection(COLLECTION_NAME, function(err, collection) {

          var addresses = [{
            name: 'John Doe',
            address1: '123 1st Ave',
            address2: 'Apt 4',
            city: 'Seattle, WA',
            zip: '98101',
            phone: '1234567890'
          }];

          collection.insert(COLLECTION_NAME, {
            safe:true
          }, function(err, result) {
            // do nothing
          });
        });
      }
    });
  }
});

exports.findById = function(req, res) {
  var id = req.params.id;
  console.log(['Finding address by id:', id].join(' '));

  db.collection(COLLECTION_NAME, function(err, collection) {
    collection.findOne({
      '_id': new BSON.ObjectID(id)
    }, function (err, item) {
      res.send(item);
    });
  });
};

exports.findAll = function(req, res) {
  console.log('Getting all addresses');

  db.collection(COLLECTION_NAME, function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.addAddress = function(req, res) {
  var address = req.body;
  conols.log(['Adding address:', JSON.stringify(address)].join(' '));

  db.collection(COLLECTION_NAME, function(err, collection) {
    collection.insert(address, {
      safe: true
    }, function(err, result) {
      if (err) {
        res.send({
          'error': 'Error adding address.'
        });
      } else {
        console.log(['Success:', JSON.stringify(result[0])].join(' '));
        res.send(result[0]);
      }
    });
  });
};

exports.updateAddress = function(req, res) {
  var id = req.params.id;
  var address = req.body;
  delete address._id;
  console.log(['Updating address:', id].join(' '));
  console.log(JSON.stringify(address));
  db.collection(COLLECTION_NAME, function(err, collection) {
    collection.update({
      '_id': new BSON.ObjectID(id)
    }, address, {
      safe: true
    }, function(err, result) {
      if (err) {
        console.log([
          'Error updating address:',
          id
        ].join(' '));
        res.send({
          'error': 'Error updating address.'
        });
      } else {

        res.send(address);
      }
    });
  });
};

exports.deleteAddress = function(req, res) {
  var id = req.params.id;
  console.log(['Deleteing address:', id].join(' '));

  db.collection(COLLECTION_NAME, function(err, collection) {
    db.collection.remove({
      '_id': BSON.ObjectID(id)
    }, {
      safe: true
    }, function (err, result) {
      if (err) {
        res.send({
          'error': 'Error removing address'
        });
      } else {
        console.log(['Address deleted:', id].join(' '));
        res.send(req.body);
      }
    });
  });
};