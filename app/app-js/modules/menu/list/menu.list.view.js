define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/menu/list/menu.list.view'),
      MenuListView;

  MenuListView = Marionette.ItemView.extend({
    template: template
  });

  return MenuListView;
});
