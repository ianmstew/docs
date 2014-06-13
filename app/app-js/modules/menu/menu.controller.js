define(function (require) {
  var MenuView = require('modules/menu/menu.view'),
      ModuleController = require('lib/module.controller'),
      appChannel = require('app.channel'),
      MenuController;

  MenuController = ModuleController.extend({

    appEvents: {
      vent: {
        'show:menu': 'showMenu'
      }
    },

    menuView: null,

    showMenu: function (service, uriClass) {
      if (!this.menuView || this.menuView.isClosed) {
        this.menuView = new MenuView();
        appChannel.commands.execute('showin:menu', this.menuView);
      }

      // if (service) {
      //   this.menuView.triggerMethod('openService', service);
      // }

      // if (uriClass) {
      //   this.menuView.triggerMethod('selectUriClass', service, uriClass);
      // }
    }
  });

  return MenuController;
});
