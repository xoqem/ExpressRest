define([
  'backbone',
  'views/address',
  'views/address-list',
  'collections/address',
  'text!templates/app.tpl'
], function(Backbone, AddressView, AddressListView, AddressCollection,
            appTemplate) {

  return Backbone.View.extend({

    el: 'body',
    template: _.template(appTemplate),

    _addressCollection: null,
    _addressListView: null,
    _addressView: null,

    initialize: function () {
      this._initCollections();
      this._initViews();

      this.render();

      this._addressCollection.fetch();
    },

    render: function () {
      this.$el.html(this.template());
      this._addressView.render();
      return this;
    },

    _initViews: function() {
      this._addressListView = new AddressListView({
        addressCollection: this._addressCollection
      });

      this._addressView = new AddressView();
    },

    _initCollections: function() {
      this._addressCollection = new AddressCollection();
    }
  });
});
