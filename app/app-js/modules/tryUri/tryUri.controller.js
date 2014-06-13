define(function (require) {
  var ModuleController = require('lib/module.controller'),
      TryUriView = require('modules/tryUri/tryUri.view'),
      UriModel = require('entities/tryUri/uri.model'),
      services = require('entities/services/services'),
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
    lastService: null,

    showTriUri: function (service, uriClass) {
      var serviceName = services.lookupServiceName(service),
          endpointName = services.lookupEndpointName(service, uriClass),
          apiName = (serviceName || service) + ' ' + (endpointName || uriClass);

      // E.g., don't show a Twitter alert on a Facebook page
      if (this.lastService !== service) {
        appChannel.commands.execute('clear:alerts');
      }

      this.uri = new UriModel({
        name: apiName,
        service: service,
        uriClass: uriClass
      });

      this.tryUriView = new TryUriView({ 
        model: this.uri
      });

      appChannel.vent.trigger('show:menu', service, uriClass);
      appChannel.commands.execute('showin:main', this.tryUriView);

      this.uri.fetchSampleUri();
      this.uri.fetchGenericUri();
      this.uri.fetchGenericOutput();
  
      this.lastService = service;
      history.navigate('tryUri/' + service + '/' + uriClass);
    },

    tryUri: function (uri) {
      this.uri.fetchUri({ uri: uri });
    }
  });

  return TryUriController;
});
