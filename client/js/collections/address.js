define([
  'backbone',
  'models/address',
  'configs/app'
], function(Backbone, AddressModel, appConfig) {
  return Backbone.Collection.extend({
    model: AddressModel,

    url: [appConfig.apiRoot, 'addresses'].join('/'),

    comparator: function (address) {
      return address.get('name');
    }
  });
});
