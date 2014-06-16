define(function (require) {
  var Module = require('lib/module'),
      ApiController = require('entities/api/api.controller'),
      app = require('app'),
      AlertModule,
      apiEntities;

  AlertModule = Module.extend({
    
    moduleControllerClass: ApiController
  });

  apiEntities = app.module('apiEntities', AlertModule);
  apiEntities.start();

  return apiEntities;
});
