define([
  'backbone',
  'text!templates/address-list-item.tpl'
], function(Backbone, addressListItemTemplate) {

  return Backbone.View.extend({

    tagName: 'a',
    className: 'list-group-item',
    template: _.template(addressListItemTemplate),

    render: function () {
      this.$el.attr('href', '#');
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});

