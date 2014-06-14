define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/menu/menuPanel/menuPanel.view'),
      MenuItemView = require('modules/menu/menuItem/menuItem.view'),
      EndpointCollection = require('entities/service/endpoint.collection'),
      MenuPanelView;

  MenuPanelView = Marionette.CompositeView.extend({

    template: template,
    itemView: MenuItemView,
    itemViewContainer: '.js-menuItem-region',
    className: 'panel panel-default',

    constructor: function (options) {
      this.collection = new EndpointCollection(options.model.get('endpoints'));
      MenuPanelView.__super__.constructor.apply(this, arguments);
    }
  });

  return MenuPanelView;
});
