define([
  'backbone',
  'views/address-list-item',
  'text!templates/address-list.tpl'
], function(Backbone, AddressListItemView, addressListTemplate) {

  return Backbone.View.extend({

    el: '#address-list',
    tagName: 'div',
    className: 'list-group',
    template: _.template(addressListTemplate),

    _addressCollection: null,

    initialize: function (options) {
      this._addressCollection = options.addressCollection;
      this._addressCollection.on('reset add remove', this.render, this);
    },

    render: function () {
      this.$el.html(this.template());
      var $panel = this.$el.children('.panel');

      this._addressCollection.each(function(address) {
        $panel.append(new AddressListItemView({
          model: address
        }).render().el);
      }, this);
      return this;
    }
  });
});
