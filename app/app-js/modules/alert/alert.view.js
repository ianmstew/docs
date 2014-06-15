define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/alert/alert.view'),
      moduleChannel = require('modules/alert/alert.channel'),
      AlertView;

  AlertView = Marionette.ItemView.extend({
    template: template,
    className: 'alert alert-danger fade',

    events: {
      'click .close': 'closeClicked'
    },

    closeClicked: function () {
      moduleChannel.vent.trigger('close:alert', this.model);
    },

    onShow: function () {
      var self = this;

      _.delay(function () {
        self.$el.addClass('in');
      }, 100);
    },

    remove: function () {
      var self = this,
          args = arguments;

      _.delay(function () {
        AlertView.__super__.remove.apply(self, args);
      }, 500);
    }
  });

  return AlertView;
});
