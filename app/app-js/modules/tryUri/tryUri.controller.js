define(function (require) {
  var ModuleController = require('lib/module.controller'),
      TryUriView = require('modules/tryUri/tryUri.view'),
      appChannel = require('app.channel'),
      history = require('lib/history'),
      TryUriController;

  TryUriController = ModuleController.extend({

    routes: {
      'tryUri/:service/:uriClass': 'showUriHelp'
    },

    appEvents: {
      vent: {
        'try-uri:help': 'showUriHelp'
      }
    },

    showUriHelp: function (service, uriClass) {
      var fetchingDatasource = appChannel.reqres.request('datasource:entity', service, uriClass);

      $.when(fetchingDatasource).always(function (datasource) {
        var tryUriView = new TryUriView({ model: datasource });

        tryUriView.triggerMethod('populateTryUri', service, uriClass);
        appChannel.vent.trigger('menu:show');
        appChannel.commands.execute('region:content-main:showin', tryUriView);
      });

      history.navigate('tryUri/' + service + '/' + uriClass);
    }
  });

  return TryUriController;
});
