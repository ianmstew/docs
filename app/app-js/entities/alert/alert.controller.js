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

      reqres: {
        'alert:entities': 'getAlerts'
      },

      commands: {
        'alert:add': 'addAlert',
        'alert:remove': 'removeAlert'
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

    getAlerts: function () {
      return this.alerts.models;
    },

    addAlert: function (alert) {
      this.alerts.add(new AlertModel(alert));
    },

    removeAlert: function (alert) {
      this.alerts.remove(alert);
    },

    alertAdded: function (model, collection, options) {
      appChannel.vent.trigger('alert:add', model);
    },

    alertRemoved: function (model, collection, options) {
      appChannel.vent.trigger('alert:remove', model);
    },

    alertsReset: function (collection, options) {
      appChannel.vent.trigger('alert:reset', collection.models);
    },

    alertChanged: function (model, options) {
      appChannel.vent.trigger('alert:change', model);
    }
  });

  return AlertController;
});
