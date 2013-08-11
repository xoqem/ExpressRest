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

    initialize: function(options) {
      if (!this.model) {
        this.model = new AddressModel();
      }
    },

    render: function () {
      this.$el.html(this.template());
      var $formButtons = this.$el.find('.form-buttons');
      $formButtons.hide();

      _.each(this.formInputs, function(obj) {
        $formButtons.before(this.inputTemplate({
          inputId: obj.key,
          label: obj.label,
          value: this.model.get(obj.key)
        }));
      }, this);
      return this;
    }
  });
});
