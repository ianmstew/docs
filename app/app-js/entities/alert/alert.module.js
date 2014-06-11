define(function (require) {
  var Module = require('lib/module'),
      AlertController = require('entities/alert/alert.controller'),
      app = require('app'),
      AlertModule,
      alertEntities;

  AlertModule = Module.extend({
    moduleControllerClass: AlertController
  });

  alertEntities = app.module('alertEntities', AlertModule);
  alertEntities.start();

  return alertEntities;
});
