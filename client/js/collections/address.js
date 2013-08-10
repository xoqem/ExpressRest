define([
  'backbone',
  'models/address'
], function(Backbone, AddressModel) {
  return Backbone.Collection.extend({
    model: AddressModel,

    url: 'addresses',

    comparator: function (address) {
      return address.get('name');
    }
  });
});
