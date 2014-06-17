define(function (require) {
  var Marionette = require('marionette'),
      ModuleController = require('lib/module.controller'),
      ServiceCollection = require('entities/service/service.collection'),
      AuthorizedServicesModel = require('entities/service/authorized/authorizedServices.model'),
      services = require('entities/service/services'),
      appChannel = require('app.channel'),
      ServiceController;

  ServiceController = ModuleController.extend({

    appEvents: {
      reqres: {
        'get:serviceCollection': 'getServiceCollection',
        'lookup:serviceName': 'lookupServiceName',
        'lookup:endpointName': 'lookupEndpointName'
      },

      commands: {
        'poll:authorizedServices': 'pollAuthorizedServices',
        'connect:service': 'connectService',
        'disconnect:service': 'disconnectService'
      }
    },

    authorizedServices: null,

    initialize: function () {
      this.authorizedServices = new AuthorizedServicesModel();
    },

    connectService: function (serviceKey) {
      window.location.assign('/auth/' + serviceKey);
    },

    disconnectService: function (serviceKey) {
      window.location.assign('/disconnect/' + serviceKey);
    },

    getServiceCollection: function () {
      return new ServiceCollection(services.clone());
    },

    pollAuthorizedServices: function () {
      this.authorizedServices.fetch({
        success: function (model, data) {
          appChannel.vent.trigger('change:authorizedServices', data.connections);
        }
      });
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
