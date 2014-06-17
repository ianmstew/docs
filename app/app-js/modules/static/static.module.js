define(function (require) {
  var Module = require('lib/module'),
      StaticController = require('modules/static/static.controller'),
      app = require('app'),
      StaticModule,
      static_;

  StaticModule = Module.extend({
    moduleControllerClass: StaticController
  });

  static_ = app.module('static', StaticModule);

  return static_;
});
