define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/menu/menuItem/menuItem.view'),
      appChannel = require('app.channel'),
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
      var disabledMessage;
      this.ui.link.addClass('types-selected');

      if (disabledMessage = this.model.get('disabledMessage')) {
        var alert = {
          title: this.model.get('disabledTitle'),
          message: disabledMessage,
          state: 'info',
          uniqueGroup: 'endpoint',
          uniqueValue: this.model.get('endpointKey')
        };

        appChannel.commands.execute('add:alert', alert);
      }
    }
  });

  return MenuItemView;
});
