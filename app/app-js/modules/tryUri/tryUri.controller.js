define(function (require) {
  var ModuleController = require('lib/module.controller'),
      TryUriView = require('modules/tryUri/tryUri.view'),
      UriModel = require('entities/tryUri/uri.model'),
      apis = require('entities/apis/apis'),
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

    moduleEvents: {
      vent: {
        'try:uri': 'tryUri'
      }
    },

    uri: null,

    showTriUri: function (service, uriClass) {
      var tryUriView,
          apiName = apis[service][uriClass] || uriClass;

      this.uri = new UriModel({
        name: apiName,
        service: service,
        uriClass: uriClass
      });

      tryUriView = new TryUriView({ 
        model: this.uri
      });

      appChannel.vent.trigger('show:menu', service, uriClass);
      appChannel.commands.execute('showin:main', tryUriView);

      this.uri.fetchSampleUri();
      this.uri.fetchGenericUri();
      this.uri.fetchGenericOutput();
  
      history.navigate('tryUri/' + service + '/' + uriClass);
    },

    tryUri: function (uri) {
      this.uri.fetchUri({ uri: uri });
    }
  });

  return TryUriController;
});
