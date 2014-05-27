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
      console.log( '*** showUriHelp for: ' + service + ', ' + uriClass );

      $( '.dashboard-content' ).load( '/app-js/modules/tryUri/' + service + '/' + uriClass + '.html' );
      //appChannel.commands.execute( 'region:content-main:showin', tos );
    }


  });

  return MenuController;
});
