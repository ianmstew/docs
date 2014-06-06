define(function (require) {
  var MenuListController = require('modules/menu/list/menu.list.controller'),
      ModuleController = require('lib/module.controller'),
      appChannel       = require('app.channel'),
      MenuController;

  MenuController = ModuleController.extend({

    routes: {
      'tryUri/:service/:uriClass': 'showUriHelp'
    },

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
    },

    showUriHelp: function( service, uriClass ) {
      $( '.dashboard-content' ).load( '/app-js/modules/tryUri/tryUri.html',
        function() {
          window.populateTryUri( service, uriClass );
        }
      );
    }


  });

  return MenuController;
});
