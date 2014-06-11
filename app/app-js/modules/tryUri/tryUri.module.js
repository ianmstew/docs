define(function (require) {
  var Module = require('lib/module'),
      TryUriController = require('modules/tryUri/tryUri.controller'),
      app = require('app'),
      TryUriModule,
      tryUri;

  TryUriModule = Module.extend({
    moduleControllerClass: TryUriController
  });

  tryUri = app.module('tryUri', TryUriModule);
  tryUri.start();

  return tryUri;
});
