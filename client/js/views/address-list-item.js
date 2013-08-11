define([
  'backbone',
  'text!templates/address-list-item.tpl'
], function(Backbone, addressListItemTemplate) {

  return Backbone.View.extend({

    tagName: 'a',
    className: 'list-group-item',
    template: _.template(addressListItemTemplate),

    events: {
      'click': '_onClick'
    },

    initialize: function(options) {
      this.model.on('change', this.render, this);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    _onClick: function() {
      this.trigger('itemClick', this.model);
    },
  });
});

