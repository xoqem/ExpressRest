define([
  'backbone',
  'text!templates/address.handlebars'
], function(Backbone, addressTemplate) {

  return Backbone.View.extend({

    tagName: 'li',
    template: _.template(addressTemplate),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});
