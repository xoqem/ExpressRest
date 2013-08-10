define([
  'backbone'
], function(Backbone) {
  return Backbone.Model.extend({
    idAttribute: "_id",

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
