define(function (require) {
  var Marionette = require('marionette'),
      MenuListView = require('modules/menu/list/menu.list.view'),
      menuChannel = require('modules/menu/menu.channel'),
      MenuListController;

  MenuListController = Marionette.Controller.extend({

    events: {
      'click': 'highlightItem'
    },

    // highlightItem

    showMenu: function () {
      var menuListView = new MenuListView();
      menuChannel.commands.execute('region:content-menu:showin', menuListView);
    }
  });

  return MenuListController;
});
