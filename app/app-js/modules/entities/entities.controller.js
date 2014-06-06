define(function (require) {
  var ModuleController = require('lib/module.controller'),
      AlertCollection = require('entities/alert/alert.collection'),
      EntitiesController;

  EntitiesController = ModuleController.extend({

    appEvents: {
      
      reqres: {
        'alert:entities': 'alertEntities'
      },

      alertEntities: function () {
        var alerts = new AlertCollection(),
            defer = $.Deferred(),
            promise = defer.promise();

        alerts.fetch({
          success: function (alertModels) {
            alerts.reset(alertModels);
            defer.resolve(alerts);
          }
        });

        return promise;
      }
    }

  });

  return EntitiesController;
});
