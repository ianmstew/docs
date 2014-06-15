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

    ui: {
      servicePanel: '.js-service-panel'
    },

    initialize: function (options) {
      this.collection = options.model.get('endpoints');
      this.itemViewOptions = {
        serviceKey: options.model.get('serviceKey')
      };
    },

    onShowService: function () {
      this.ui.servicePanel
        .addClass('in')
        .css('height', 'auto');
    },

    onSelectEndpoint: function (endpointKey) {
      var endpointModel = this.collection.where({ endpointKey: endpointKey })[0],
          endpointView = this.children.findByModel(endpointModel);
      endpointView.triggerMethod('select');
    }
  });

  return MenuPanelView;
});
