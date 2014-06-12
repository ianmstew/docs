define(function (require) {
  var Module = require('lib/module'),
      WelcomeController = require('modules/welcome/welcome.controller'),
      app = require('app'),
      WelcomeModule,
      welcome;

  WelcomeModule = Module.extend({
    moduleControllerClass: WelcomeController
  });

  welcome = app.module('welcome', WelcomeModule);
  welcome.start();

  return welcome;
});
