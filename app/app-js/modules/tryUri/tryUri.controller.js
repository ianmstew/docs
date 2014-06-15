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
        'show:try-uri': 'showTryUri'
      }
    },

    moduleEvents: {
      vent: {
        'try:uri': 'tryUri'
      }
    },

    api: null,
    lastService: null,
    tryUriView: null,

    showTryUri: function (serviceKey, endpointKey) {
      appChannel.vent.trigger('show:menu', serviceKey, endpointKey);

      // E.g., don't show a Twitter alert on a Facebook page
      if (this.lastService !== serviceKey) {
        appChannel.commands.execute('clear:alerts');
      }

      if (!this.tryUriView || this.tryUriView.isClosed) {
        this.api = appChannel.reqres.request('get:api', serviceKey, endpointKey);
        this.tryUriView = new TryUriView({ 
          model: this.api
        });
        appChannel.commands.execute('showin:main', this.tryUriView);
      } else {
        this.api.set({
          serviceKey: serviceKey,
          endpointKey: endpointKey
        });
      }

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
