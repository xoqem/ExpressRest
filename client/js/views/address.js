define([
  'backbone',
  'models/address',
  'text!templates/address.tpl',
  'text!templates/address-form-input.tpl'
], function(Backbone, AddressModel, addressTemplate, addressFormInputTemplate) {

  return Backbone.View.extend({

    el: '#address',
    template: _.template(addressTemplate),
    inputTemplate: _.template(addressFormInputTemplate),

    events: {
      'click .delete-button': '_onDeleteButtonClick',
      'click .cancel-button': '_onCancelButtonClick',
      'click .save-button': '_onSaveButtonClick'
    },

    formInputs: [{
      key: 'name',
      label: 'Name'
    }, {
      key: 'address1',
      label: 'Address'
    }, {
      key: 'address2',
      label: 'Address 2'
    }, {
      key: 'city',
      label: 'City'
    }, {
      key: 'state',
      label: 'State'
    }, {
      key: 'zip',
      label: 'Zip'
    }, {
      key: 'phone',
      label: 'Phone'
    }],

    _addressCollection: null,

    initialize: function(options) {
      this._addressCollection = options.addressCollection;
      this._addressCollection.on(
        'selectedAddressChanged', this._onSelectedAddressChanged, this);
    },

    render: function() {
      this.$el.html(this.template());

      if (this.model) {
        $addressFormButtons = this.$el.find('.address-form-buttons');
        _.each(this.formInputs, function(obj) {
          $addressFormButtons.before(this.inputTemplate({
            inputId: obj.key,
            label: obj.label,
            value: this.model.get(obj.key)
          }));
          this.$el.find('#' + obj.key).on('input', _.bind(function() {
            this._updateEditingState(true);
          }, this));
        }, this);

        this._updateEditingState(false);

      } else {
        this.$el.find('.address-form').hide();
      }

      return this;
    },

    _updateEditingState: function(isEditing) {
      this.$el.find('.save-button').toggle(isEditing);
      this.$el.find('.cancel-button').toggle(isEditing);
    },

    _onCancelButtonClick: function() {
      this._updateEditingState(false);
      this.render();
    },

    _onDeleteButtonClick: function() {
      this.model.destroy();
      this._addressCollection.setSelectedAddress(null);
    },

    _onSaveButtonClick: function() {
      this._updateEditingState(false);

      var properties = {};
      _.each(this.formInputs, function(obj) {
        properties[obj.key] = this.$el.find('#' + obj.key).val();
      }, this);

      this.model.save(properties);
    },

    _onSelectedAddressChanged: function(address) {
      this.model = address;
      this.render();
    }
  });
});
