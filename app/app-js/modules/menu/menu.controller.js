define(function (require) {
  var MenuView = require('modules/menu/menu.view'),
      ModuleController = require('lib/module.controller'),
      ServiceCollection = require('entities/service/service.collection'),
      appChannel = require('app.channel'),
      moduleChannel = require('modules/menu/menu.channel'),
      MenuController;

  MenuController = ModuleController.extend({

    appEvents: {
      vent: {
        'show:menu': 'showMenu'
      }
    },

    menuView: null,

    showMenu: function (serviceKey, endpointKey) {

      if (!this.menuView || this.menuView.isClosed) {
        var services = appChannel.reqres.request('get:services');
        
        this.menuView = new MenuView({
          collection: new ServiceCollection(services)
        });
        appChannel.commands.execute('showin:menu', this.menuView);
      }

      if (serviceKey) {
        moduleChannel.vent.trigger('show:service', serviceKey);
      }

      if (endpointKey) {
        moduleChannel.vent.trigger('select:endpoint', serviceKey, endpointKey);
      }
    }
  });

  return MenuController;
});
