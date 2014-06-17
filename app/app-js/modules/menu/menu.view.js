define(function (require) {
  var Marionette = require('marionette'),
      MenuPanelView = require('modules/menu/menuPanel/menuPanel.view'),
      moduleChannel = require('modules/menu/menu.channel'),
      MenuView;

  MenuView = Marionette.CollectionView.extend({
    
    itemView: MenuPanelView,
    id: 'servicesMenu',
    className: 'panel-group',

    initialize: function () {
      var self = this;

      this.listenTo(moduleChannel.vent, 'show:service', function (serviceKey) {
        var serviceModel = self.collection.where({ serviceKey: serviceKey })[0],
            serviceView = self.children.findByModel(serviceModel);

        serviceView.triggerMethod('showService');
      });

      this.listenTo(moduleChannel.vent, 'select:endpoint', function (serviceKey, endpointKey) {
        var serviceModel = self.collection.where({ serviceKey: serviceKey })[0],
            serviceView = self.children.findByModel(serviceModel);

        // global de-select; see menuItm.view.js#onSelect()
        self.$('.types-selected').removeClass('types-selected');

        serviceView.triggerMethod('selectEndpoint', endpointKey);
      });
    }
  });

  return MenuView;
});
