define(function (require) {
  var ModuleController = require('lib/module.controller'),
      ServiceCollection = require('entities/service/service.collection'),
      services = require('entities/service/services'),
      ServiceController;

  ServiceController = ModuleController.extend({

    appEvents: {
      reqres: {
        'get:services': 'getServices',
        'lookup:serviceName': 'lookupServiceName',
        'lookup:endpointName': 'lookupEndpointName'
      }
    },

    getServices: function () {
      return new ServiceCollection(services.clone());
    },

    lookupServiceName: function (serviceKey) {
      return services.lookupServiceName(serviceKey);
    },

    lookupEndpointName: function (serviceKey, endpointKey) {
      return services.lookupEndpointName(serviceKey, endpointKey);
    }
  });

  return ServiceController;
});
