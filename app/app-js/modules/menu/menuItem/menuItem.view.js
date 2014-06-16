define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/menu/menuItem/menuItem.view'),
      MenuItemView;

  MenuItemView = Marionette.ItemView.extend({
    
    template: template,
    tagName: 'li',

    ui: {
      link: 'a'
    },

    initialize: function () {
      this.serviceKey = this.options.serviceKey;
    },

    serializeData: function () {
      var data = this.model.toJSON();
      data.serviceKey = this.serviceKey;
      return data;
    },

    onSelect: function () {
      this.ui.link.addClass('types-selected');
    }
  });

  return MenuItemView;
});
