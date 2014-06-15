define(function (require) {
  var AlertsView = require('modules/alert/alerts.view'),
      ModuleController = require('lib/module.controller'),
      AlertCollection = require('entities/alert/alert.collection'),
      appChannel = require('app.channel'),
      AlertController;

  /*
   * The Alert Controller simply listens to alert events (triggered by Alert Entities Controller)
   * and renders the changes appopriately.  Rendering is backed by a private collection of alert
   * models, and inserted into the Content-Alert application region.
   */
  AlertController = ModuleController.extend({

    appEvents: {
      vent: {
        'add:alert': 'addAlert',
        'remove:alert': 'removeAlert',
        'reset:alerts': 'resetAlerts'
      }
    },

    moduleEvents: {
      vent: {
        'close:alert': 'closeAlert'
      }
    },

    alertCollection: null,
    alertsView: null,

    initialize: function () {
      this.alertCollection = new AlertCollection();
    },

    showAlerts: function () {
      if (!this.alertsView || this.alertsView.isClosed) {
        this.alertsView = new AlertsView({
          collection: this.alertCollection
        });
        appChannel.commands.execute('showin:alert', this.alertsView);
      }
    },

    addAlert: function (model) {
      this.alertCollection.add(model);
      this.showAlerts();
    },

    removeAlert: function (model) {
      this.alertCollection.remove(model);
      this.showAlerts();
    },

    resetAlerts: function (models) {
      this.alertCollection.reset(models);
      this.showAlerts();
    },

    closeAlert: function (model) {
      appChannel.commands.execute('remove:alert', model);
    }
  });

  return AlertController;
});
