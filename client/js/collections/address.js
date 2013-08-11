define([
  'backbone',
  'models/address'
], function(Backbone, AddressModel) {
  return Backbone.Collection.extend({
    model: AddressModel,

    url: 'addresses',

    _selectedAddress: null,

    initialize: function(options) {
      this.on('change:name', this._onModelNameChange, this);
    },

    setSelectedAddress: function(address) {
      this._selectedAddress = address;
      this.trigger('selectedAddressChanged', address);
    },

    comparator: function (address) {
      return address.get('name');
    },

    _onModelNameChange: function() {
      this.sort();
    }
  });
});
