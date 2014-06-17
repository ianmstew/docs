define(function (require) {
  var ModuleController = require('lib/module.controller'),
      TryUriView = require('modules/tryUri/tryUri.view'),
      appChannel = require('app.channel'),
      history = require('lib/history'),
      TryUriController;

  TryUriController = ModuleController.extend({

    routes: {
      'tryUri/:service/:uriClass': 'showTryUri'
    },

    appEvents: {
      vent: {
        'show:try-uri': 'showTryUri',
        'change:authorizedServices': 'authorizedServicesChanged'
      }
    },

    moduleEvents: {
      vent: {
        'try:uri': 'tryUri',
        'connect': 'connect'
      }
    },

    api: null,
    tryUriView: null,
    currentService: null,
    authorizedServices: null,

    showTryUri: function (serviceKey, endpointKey) {
      this.currentService = serviceKey;
      appChannel.vent.trigger('show:menu', serviceKey, endpointKey);

      if (!this.tryUriView || this.tryUriView.isClosed) {
        this.api = appChannel.reqres.request('get:apiModel', serviceKey, endpointKey);
        this.tryUriView = new TryUriView({ 
          model: this.api
        });
        appChannel.commands.execute('showin:mainRegion', this.tryUriView);
      } else {
        this.api.clear();
        this.api.set({
          serviceKey: serviceKey,
          endpointKey: endpointKey
        });
      }

      this.api.fetchSampleUri();
      this.api.fetchGenericUri();
      this.api.fetchGenericOutput();
  
      this.updateAuthorized();
      history.navigate('tryUri/' + serviceKey + '/' + endpointKey);
    },

    connect: function () {
      appChannel.commands.execute('connect:service', this.currentService);
    },

    authorizedServicesChanged: function (services) {
      this.authorizedServices = services;
      this.updateAuthorized();
    },

    updateAuthorized: function () {
      if (_.indexOf(this.authorizedServices, this.currentService) >= 0) {
        this.tryUriView.triggerMethod('setAuthorized', true);
      } else {
        this.tryUriView.triggerMethod('setAuthorized', false);
      }
    },

    tryUri: function (uri) {
      this.api.fetchTryUri({ uri: uri });
    }
  });

  return TryUriController;
});
