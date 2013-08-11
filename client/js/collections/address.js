define([
  'backbone',
  'models/address'
], function(Backbone, AddressModel) {
  return Backbone.Collection.extend({
    model: AddressModel,

    url: 'addresses',

    _selectedAddress: null,

    getSelectedAddress: function(address) {
      return this._selectedAddress;
    },

    setSelectedAddress: function(address) {
      this._selectedAddress = address;
      this.trigger('selectedAddressChanged', address);
    },

    comparator: function (address) {
      return address.get('name');
    }
  });
});
