define(function (require) {
  var Module = require('lib/module'),
      AlertController = require('modules/alert/alert.controller'),
      app = require('app'),
      AlertModule,
      alert;

  AlertModule = Module.extend({
    moduleControllerClass: AlertController
  });

  alert = app.module('alert', AlertModule);
  alert.start();

  return alert;
});
