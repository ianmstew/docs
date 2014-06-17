define(function (require) {
  require('marionette');
  require('bootstrap');
  require('backbone.computedfields');
  require('lib/eventDebugger');

  var Marionette = require('marionette'),
      app = require('app'),

      api = require('entities/api/api.module'),
      service = require('entities/service/service.module'),
      alert = require('entities/alert/alert.module'),

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
  api.start();
  service.start();
  alert.start();

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
