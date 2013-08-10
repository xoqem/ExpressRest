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
      this.render();

      this._initCollections();
      this._initViews();

      this._addressCollection.fetch();
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    },

    _initViews: function() {
      this._addressListView = new AddressListView({
        addressCollection: this._addressCollection
      });
      this._addressListView.render();

      this._addressView = new AddressView();
      this._addressView.render();
    },

    _initCollections: function() {
      this._addressCollection = new AddressCollection();
    }
  });
});
