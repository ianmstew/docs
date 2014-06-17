define(function (require) {
  var ModuleController = require('lib/module.controller'),
      ApiModel = require('entities/api/api.model'),
      ApiController;

  ApiController = ModuleController.extend({

    appEvents: {
      reqres: {
        'get:apiModel': 'getApiModel'
      }
    },

    getApiModel: function (serviceKey, endpointKey) {
      return new ApiModel({
        serviceKey: serviceKey,
        endpointKey: endpointKey
      });
    }
  });

  return ApiController;
});
