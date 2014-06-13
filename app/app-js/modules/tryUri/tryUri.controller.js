define(function (require) {
  var ModuleController = require('lib/module.controller'),
      TryUriView = require('modules/tryUri/tryUri.view'),
      appChannel = require('app.channel'),
      history = require('lib/history'),
      TryUriController;

  TryUriController = ModuleController.extend({

    routes: {
      'tryUri/:service/:uriClass': 'showTriUri'
    },

    appEvents: {
      vent: {
        'show:try-uri': 'showTriUri'
      }
    },

    showTriUri: function (service, uriClass) {
      var fetchingDatasource = appChannel.reqres.request('fetch:datasource', service, uriClass);

      $.when(fetchingDatasource).always(function (datasource) {

        var tryUriView = new TryUriView({ 
          model: datasource,
          service: service,
          uriClass: uriClass
        });

        appChannel.vent.trigger('show:menu');
        appChannel.commands.execute('showin:main', tryUriView);
      });

      history.navigate('tryUri/' + service + '/' + uriClass);
    }
  });

  return TryUriController;
});
