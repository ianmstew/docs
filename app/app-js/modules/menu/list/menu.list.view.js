define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/menu/list/menu.list.view'),
      MenuListView;

  MenuListView = Marionette.ItemView.extend({
    template: template,
    id: 'accordion',
    className: 'panel-group'
  });

  return MenuListView;
});
