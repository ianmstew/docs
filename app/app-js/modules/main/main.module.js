define(function (require) {
  var Module = require('lib/module'),
      MainController = require('modules/main/main.controller'),
      app = require('app'),
      MainModule,
      main;

  MainModule = Module.extend({
    moduleControllerClass: MainController
  });

  main = app.module('main', MainModule);
  main.start();

  return main;
});
