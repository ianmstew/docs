define(function (require) {
  var MenuView = require('modules/menu/menu.view'),
      ModuleController = require('lib/module.controller'),
      appChannel = require('app.channel'),
      moduleChannel = require('modules/menu/menu.channel'),
      MenuController;

  MenuController = ModuleController.extend({

    appEvents: {
      vent: {
        'show:menu': 'showMenu'
      },
      reqres: {
        'get:services': 'getServices'
      }
    },

    menuView: null,
    services: null,

    initialize: function () {
      this.services = appChannel.reqres.request('get:services');
    },

    showMenu: function (serviceKey, endpointKey) {
      if (!this.menuView || this.menuView.isClosed) {        
        this.menuView = new MenuView({
          collection: this.services
        });
        this.services.fetchAuthorized();
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
