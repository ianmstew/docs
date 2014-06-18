define(function (require) {
  var Module = require('lib/module'),
      ServiceController = require('entities/service/service.controller'),
      app = require('app'),
      ServiceModule,
      serviceEntities;

  ServiceModule = Module.extend({
    
    moduleControllerClass: ServiceController
  });

  serviceEntities = app.module('serviceEntities', ServiceModule);

  return serviceEntities;
});
