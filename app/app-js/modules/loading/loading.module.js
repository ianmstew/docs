define(function (require) {
  var Module = require('lib/module'),
      LoadingController = require('modules/loading/loading.controller'),
      app = require('app'),
      LoadingModule,
      loading;

  LoadingModule = Module.extend({
    moduleControllerClass: LoadingController
  });

  loading = app.module('loading', LoadingModule);

  return loading;
});
