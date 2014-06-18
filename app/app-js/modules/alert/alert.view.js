define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/alert/alert.view'),
      moduleChannel = require('modules/alert/alert.channel'),
      AlertView;

  AlertView = Marionette.ItemView.extend({
    template: template,
    className: 'alert fade',

    events: {
      'click .close': 'closeClicked'
    },

    closeClicked: function () {
      moduleChannel.vent.trigger('close:alert', this.model);
    },

    onRender: function () {
      this.$el.addClass('alert-' + this.model.get('state'));
    },

    onShow: function () {
      var self = this;

      _.delay(function () {
        self.$el.addClass('in');
      }, 100);
    }
  });

  return AlertView;
});
