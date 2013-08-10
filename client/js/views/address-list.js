define([
  'backbone',
  'views/address-list-item'
], function(Backbone, AddressListItemView) {

  return Backbone.View.extend({

    el: '#address-list',
    tagName: 'div',
    className: 'list-group',

    _addressCollection: null,

    initialize: function (options) {
      this._addressCollection = options.addressCollection;
      this._addressCollection.on('reset add remove', this.render, this);
    },

    render: function () {
      this.$el.empty();
      this._addressCollection.each(function(address) {
        this.$el.append(new AddressListItemView({
          model: address
        }).render().el);
      }, this);
      return this;
    }
  });
});
