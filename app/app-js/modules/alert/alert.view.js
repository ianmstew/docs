define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/alert/alert.view'),
      alertChannel = require('modules/alert/alert.channel'),
      AlertView;

  AlertView = Marionette.ItemView.extend({
    template: template,
    className: 'alert alert-danger fade in hidden',

    events: {
      'click .close': 'closeClicked'
    },

    closeClicked: function () {
      var self = this;
      _.delay(function () {
        alertChannel.vent.trigger('close:alert', self.model);
      }, 1000);
    }
  });

  return AlertView;
});
