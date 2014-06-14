define(function (require) {
  var ModuleController = require('lib/module.controller'),
      TryUriView = require('modules/tryUri/tryUri.view'),
      ApiModel = require('entities/api/api.model'),
      services = require('entities/service/services'),
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

    api: null,
    lastService: null,

    showTriUri: function (serviceKey, endpointKey) {
      var serviceName = services.lookupServiceName(serviceKey),
          endpointName = services.lookupEndpointName(serviceKey, endpointKey),
          apiName = serviceName + ' ' + endpointName;

      // E.g., don't show a Twitter alert on a Facebook page
      if (this.lastService !== serviceKey) {
        appChannel.commands.execute('clear:alerts');
      }

      this.api = new ApiModel({
        name: apiName,
        serviceKey: serviceKey,
        endpointKey: endpointKey
      });

      this.tryUriView = new TryUriView({ 
        model: this.api
      });

      appChannel.vent.trigger('show:menu', serviceKey, endpointKey);
      appChannel.commands.execute('showin:main', this.tryUriView);

      this.api.fetchSampleUri();
      this.api.fetchGenericUri();
      this.api.fetchGenericOutput();
  
      this.lastService = serviceKey;
      history.navigate('tryUri/' + serviceKey + '/' + endpointKey);
    },

    tryUri: function (uri) {
      this.api.fetchTryUri({ uri: uri });
    }
  });

  return TryUriController;
});
