define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/menu/menuItem/menuItem.view'),
      MenuItemView;

  MenuItemView = Marionette.ItemView.extend({
    
    template: template,
    tagName: 'li'
  });

  return MenuItemView;
});
