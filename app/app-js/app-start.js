define(function (require) {
  require('marionette');
  require('bootstrap');
  require('backbone.computedfields');
  require('lib/eventDebugger');

  var Marionette = require('marionette'),
      app = require('app'),

      apiEntity = require('entities/api/api.module'),
      serviceEntity = require('entities/service/service.module'),
      alertEntity = require('entities/alert/alert.module'),

      header = require('modules/header/header.module'),
      menu = require('modules/menu/menu.module'),
      welcome = require('modules/welcome/welcome.module'),
      footer = require('modules/footer/footer.module'),
      static_ = require('modules/static/static.module'),
      tryUri = require('modules/tryUri/tryUri.module'),
      alert = require('modules/alert/alert.module'),
      loading = require('modules/loading/loading.module');

  // Override templating method to use hgn templates
  Marionette.Renderer.render = function (template, data) {
    return template(data);
  };

  // start entity modules
  apiEntity.start();
  serviceEntity.start();
  alertEntity.start();

  // start rendering modules
  header.start();
  menu.start();
  welcome.start();
  footer.start();
  static_.start();
  tryUri.start();
  alert.start();
  loading.start();

  // start app
  app.start();

});
