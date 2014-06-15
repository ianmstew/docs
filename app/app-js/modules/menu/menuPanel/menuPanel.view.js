define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/menu/menuPanel/menuPanel.view'),
      MenuItemView = require('modules/menu/menuItem/menuItem.view'),
      MenuPanelView;

  MenuPanelView = Marionette.CompositeView.extend({

    template: template,
    itemView: MenuItemView,
    itemViewContainer: '.js-menuItem-region',
    className: 'panel panel-default',

    constructor: function (options) {
      this.collection = options.model.get('endpoints');
      this.itemViewOptions = {
        serviceKey: options.model.get('serviceKey')
      };
      MenuPanelView.__super__.constructor.apply(this, arguments);
    }
  });

  return MenuPanelView;
});
