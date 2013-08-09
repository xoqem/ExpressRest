define([
  'jquery',
  'underscore',
  'backbone',
  'views/address-list',
  'collections/address',
  'text!templates/app.handlebars'
], function($, _, Backbone, AddressListView, AddressCollection,
            appTemplate) {

  return Backbone.View.extend({

    el: 'body',
    template: _.template(appTemplate),

    _addressCollection: null,
    _addressListView: null,

    initialize: function () {
      this.render();

      this._initCollections();
      this._initViews();

      this._addressCollection.fetch();
    },

    render: function () {
      this.$el.html(this.template());
    },

    _initViews: function() {
      this._addressListView = new AddressListView({
        addressCollection: this._addressCollection
      });
    },

    _initCollections: function() {
      this._addressCollection = new AddressCollection();
    }
  });
});
