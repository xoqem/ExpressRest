define([
  'backbone',
  'views/address-list-item',
  'text!templates/address-list.tpl'
], function(Backbone, AddressListItemView, addressListTemplate) {

  return Backbone.View.extend({

    el: '#address-list',
    template: _.template(addressListTemplate),

    events: {
      'click .add-button': '_onAddButtonClick'
    },

    _addressCollection: null,

    // keyed by the address id for the list item
    _listItemViews: {},
    _selectedListItemView: null,

    initialize: function(options) {
      this._addressCollection = options.addressCollection;
      this._addressCollection.on('sort reset add remove', this.render, this);
      this._addressCollection.on(
        'remove', this._onAddressCollectionRemove, this);
      this._addressCollection.on(
        'selectedAddressChanged', this._onSelectedAddressChanged, this);
    },

    render: function() {
      this.$el.html(this.template());
      var $addressListItems = this.$el.find('.address-list-items');
      this._addressCollection.each(function(address) {
        var listItemView = this._getListItemView(address);
        $addressListItems.append(listItemView.render().el);

        // Need to re-bind list item events as it may have been removed from
        // the dom, and we are adding it back.
        listItemView.delegateEvents();
      }, this);
      return this;
    },

    _onAddButtonClick: function() {
      var address = this._addressCollection.create({
        name: 'New Contact'
      }, {
        wait: true,
        success: _.bind(function() {
          this._addressCollection.setSelectedAddress(address);
        }, this)
      });
    },

    _onSelectedAddressChanged: function(address) {
      if (this._selectedListItemView) {
        this._selectedListItemView.$el.removeClass('active');
      }

      this._selectedListItemView = this._getListItemView(address);
      if (this._selectedListItemView) {
        this._selectedListItemView.$el.addClass('active');
      }
    },

    _getListItemView: function(address) {
      if (!address) return null;

      if (!(address.id in this._listItemViews)) {
        var listItemView = new AddressListItemView({
          model: address
        });
        listItemView.on('itemClick', function() {
          this._addressCollection.setSelectedAddress(address);
        }, this);
        this._listItemViews[address.id] = listItemView;
      }
      return this._listItemViews[address.id];
    },

    _onAddressCollectionRemove: function(address) {
      delete this._listItemViews[address.id];
    }
  });
});
