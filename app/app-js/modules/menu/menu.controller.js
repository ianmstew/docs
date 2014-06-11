define(function (require) {
  var MenuView = require('modules/menu/menu.view'),
      ModuleController = require('lib/module.controller'),
      appChannel = require('app.channel'),
      MenuController;

  MenuController = ModuleController.extend({

    appEvents: {
      vent: {
        'menu:show': 'showMenu'
      }
    },

    showMenu: function () {
      var menuView = new MenuView();
      appChannel.commands.execute('region:content-menu:showin', menuView);
    }
  });

  return MenuController;
});
