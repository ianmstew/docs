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
      console.log( '*** showUriHelp: ' + service + ', ' + uriClass );
      var tos = require( 'modules/static/tos/tos.view' );
      appChannel.commands.execute( 'region:content-main:showin', tos );
    }


  });

  return MenuController;
});
