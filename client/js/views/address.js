define([
  'backbone',
  'models/address',
  'text!templates/address.tpl'
], function(Backbone, AddressModel, addressTemplate) {

  return Backbone.View.extend({

    el: '#address',
    template: _.template(addressTemplate),

    initialize: function(options) {
      if (!this.model) {
        this.model = new AddressModel();
      }
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});
