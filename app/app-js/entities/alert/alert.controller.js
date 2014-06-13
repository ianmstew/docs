define(function (require) {
  var Marionette = require('marionette'),
      ModuleController = require('lib/module.controller'),
      AlertCollection = require('entities/alert/alert.collection'),
      AlertModel = require('entities/alert/alert.model'),
      appChannel = require('app.channel'),
      AlertController;

  /*
   * The Alert Entity Controller keeps a private collection of Alert models and exposes an API
   * to get, add, remove, and reset the collection.  Changes to the collection are broadcasted
   * over the application channel.
   */
  AlertController = ModuleController.extend({

    appEvents: {
      commands: {
        'add:alert': 'addAlert',
        'remove:alert': 'removeAlert'
      }
    },

    alertEvents: {
      'add':    'alertAdded',
      'remove': 'alertRemoved',
      'reset':  'alertsReset',
      'change': 'alertChanged'
    },

    alerts: null,

    initialize: function () {
      this.alerts = new AlertCollection();
      Marionette.bindEntityEvents(this, this.alerts, this.alertEvents);
    },

    addAlert: function (alert) {
      this.alerts.add(new AlertModel(alert));
    },

    removeAlert: function (alert) {
      this.alerts.remove(alert);
    },

    alertAdded: function (model, collection, options) {
      appChannel.vent.trigger('add:alert', model);
    },

    alertRemoved: function (model, collection, options) {
      appChannel.vent.trigger('remove:alert', model);
    },

    alertsReset: function (collection, options) {
      appChannel.vent.trigger('reset:alerts', collection.models);
    },

    alertChanged: function (model, options) {
      appChannel.vent.trigger('alert:change', model);
    }
  });

  return AlertController;
});
