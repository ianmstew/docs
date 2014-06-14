require.config({

  paths: {
    'jquery':                  '../vendor/jquery/jquery',
    'underscore':              '../vendor/underscore/underscore',
    'backbone':                '../vendor/backbone/backbone',
    'backbone.wreqr':          '../vendor/backbone.wreqr/backbone.wreqr',
    'backbone.babysitter':     '../vendor/backbone.babysitter/backbone.babysitter',
    'backbone.computedfields': '../vendor/backbone-computedfields/backbone.computedfields',
    'marionette':              '../vendor/marionette/backbone.marionette',
    'bootstrap':               '../vendor/bootstrap/bootstrap',
    'parsley':                 '../vendor/parsleyjs/parsley',
    'hogan':                   '../vendor/requirejs-hogan-plugin/hogan',
    'hgn':                     '../vendor/requirejs-hogan-plugin/hgn',
    'text':                    '../vendor/requirejs-hogan-plugin/text',
    
    // change to logger-prod for production (disables logging)
    'lib/logger':              'lib/logger-dev'
  },

  shim: {
    'underscore': {
      exports: '_'
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'parsley': {
      deps: ['jquery']
    },
    'backbone.computedfields': {
      deps: ['backbone']
    }
  },

  hgn: {
    templateExtension: '.html'
  }
});

require([
  'marionette',
  'app',
  'bootstrap',
  'modules/header/header.module',
  'modules/menu/menu.module',
  'modules/welcome/welcome.module',
  'modules/footer/footer.module',
  'modules/static/static.module',
  'modules/tryUri/tryUri.module',
  'modules/alert/alert.module',
  'entities/alert/alert.module',
  'debug/event.debugger'
],
function (Marionette, app) {
  // Override templating method to use hgn templates
  Marionette.Renderer.render = function (template, data) {
    return template(data);
  };

  app.start();
});
