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

    showMenu: function () {
      var menuView = new MenuView();
      appChannel.commands.execute('showin:menu', menuView);
    }
  });

  return MenuController;
});
