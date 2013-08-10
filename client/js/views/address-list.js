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

    // keyed by the address id for the list item
    _listItemViews: {},
    _selectedListItem: null,

    initialize: function (options) {
      this._addressCollection = options.addressCollection;
      this._addressCollection.on('reset add remove', this.render, this);
    },

    render: function () {
      this.$el.html(this.template());
      var $panel = this.$el.children('.panel');
      this._addressCollection.each(function(address) {
        var listItemView = this._getListItemView(address);
        $panel.append(listItemView.render().el);
      }, this);
      return this;
    },

    _getListItemView: function(address) {
      if (!(address.id in this._listItemViews)) {
        var listItemView = new AddressListItemView({
          model: address
        });
        listItemView.on('itemClick', this._onItemClick, this);
        this._listItemViews[address.id] = listItemView;
      }
      return this._listItemViews[address.id];
    },

    _onItemClick: function(address) {
      var listItemView = this._getListItemView(address);
      if (listItemView === this._selectedListItem) return;

      if (this._selectedListItem) {
        this._selectedListItem.$el.removeClass('active');
      }
      this._selectedListItem = listItemView;
      this._selectedListItem.$el.addClass('active');
    },
  });
});
