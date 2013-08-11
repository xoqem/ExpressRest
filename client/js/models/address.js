define([
  'backbone'
], function(Backbone) {
  return Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: 'addresses',

    defaults: {
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
    }

  });
});
