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
      "click .delete-button": "_onDeleteButtonClick",
      "click .cancel-button": "_onCancelButtonClick",
      "click .save-button": "_onSaveButtonClick"
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

    render: function () {
      this.$el.html(this.template());
      var $formButtons = this.$el.find('.form-buttons');
      _.each(this.formInputs, function(obj) {
        $formButtons.before(this.inputTemplate({
          inputId: obj.key,
          label: obj.label,
          value: this.model && this.model.get(obj.key)
        }));
      }, this);

      var $saveButton = this.$el.find('.save-button');
      var $cancelButton = this.$el.find('.cancel-button');
      var $deleteButton = this.$el.find('.delete-button');

      if (!this.model) {
        $deleteButton.hide();
      } else {
        $cancelButton.hide();
        $saveButton.hide();
      }

      return this;
    },

    _onCancelButtonClick: function() {
      this.render();
    },

    _onDeleteButtonClick: function() {
      this.model.destroy();
    },

    _onSaveButtonClick: function() {
      if (this)
      var properties = {};
      _.each(this.formInputs, function(obj) {
        properties[obj.key] = this.$el.find('#' + obj.key).val();
      }, this);

      if (this.model) {
        this.model.save(properties);
      } else {
        var address = this._addressCollection.create(properties);
        this._addressCollection.setSelectedAddress(address);
      }
    },

    _onSelectedAddressChanged: function(address) {
      this.model = address;
      this.render();
    }
  });
});
