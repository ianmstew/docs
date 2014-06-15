define(function (require) {
  var ModuleController = require('lib/module.controller'),
      services = require('entities/service/services'),
      ServiceController;

  ServiceController = ModuleController.extend({

    appEvents: {
      reqres: {
        'get:services': 'getServices'
      }
    },

    getServices: function () {
      return services.clone();
    }
  });

  return ServiceController;
});
