define(function (require) {
  var MenuListController = require('modules/menu/list/menu.list.controller'),
      ModuleController = require('lib/module.controller'),
      MenuController;

  MenuController = ModuleController.extend({

    appEvents: {
      commands: {
        'menu:show': 'showMenu'
      }
    },

    forwardEvents: {
      commands: [
        'region:content-menu:showin'
      ]
    },

    menuListController: null,

    initialize: function () {
      this.menuListController = new MenuListController();
    },

    showMenu: function () {
      this.menuListController.showMenu();
    }
  });

  return MenuController;
});
