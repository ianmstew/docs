define(function (require) {
  var Module = require('lib/module'),
      DatasourceController = require('entities/datasource/datasource.controller'),
      app = require('app'),
      DatasourceModule,
      datasource;

  DatasourceModule = Module.extend({
    moduleControllerClass: DatasourceController
  });

  datasource = app.module('datasource', DatasourceModule);
  datasource.start();

  return datasource;
});
