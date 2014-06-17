define(function (require) {
  var AppContentLayout = require('app.content.layout'),
      ModuleController = require('lib/module.controller'),
      LoadingView = require('modules/loading/loading.view'),
      appChannel = require('app.channel'),
      Marionette = require('marionette'),
      LoadingController;

  LoadingController = ModuleController.extend({

    appEvents: {
      vent: {
        'loading:data': 'loadingData',
        'loaded:data': 'loadedData'
      }
    },

    initialize: function () {
      console.log('HERE!');
      // this.loadingView = new LoadingView();
      // appChannel.commands.execute('showin:loadingRegion', this.loadingView);
    },

    loadingData: function (modalData) {
    },

    loadedData: function () {
    }
  });

  return LoadingController;
});
