define([
  'jquery',
  'underscore',
  'backbone',
  'views/address'
], function($, _, Backbone, AddressView) {

  return Backbone.View.extend({

    el: '#addresses',
    tagName: 'ul',

    _addressCollection: null,

    initialize: function (options) {
      console.log('initialize');
      this._addressCollection = options.addressCollection;
      this._addressCollection.on('reset add remove', this.render, this);
    },

    render: function () {
      console.log('render');
      this.$el.empty();
      this._addressCollection.each(function(address) {
        this.$el.append(new AddressView({
          model: address
        }).render().el);
      }, this);

      return this;
    }
  });
});
